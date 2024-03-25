from babel.support import Translations, NullTranslations
from babel import Locale
from httpx import URL
from markdown_it import MarkdownIt
from markdown_it.presets import commonmark
from markdown_it.utils import PresetType
from loguru import logger
import json
from jinja2 import Environment, FileSystemLoader

from env import CSAUTO_BASE_URL, CSAUTO_DISABLE_META
from shared import DEFAULT_LANGUAGE, Paths, LANGUAGES_IDS_STR_LITERAL, compile_translations, SUPPORTED_LANGUAGES
from github_md import GHReferenceRenderer
from get_data import BaseDataProvider, RawGithubProvider

import typing as t


class gfm_like_custom:  # noqa: N801
    """GitHub Flavoured Markdown (GFM) like.

    This adds the linkify, table and strikethrough components to CommmonMark (plus GHRefLink).

    Note, it lacks task-list items and raw HTML filtering,
    to meet the the full GFM specification
    (see https://github.github.com/gfm/#autolinks-extension-).
    """

    @staticmethod
    def make() -> PresetType:
        config = commonmark.make()
        config["components"]["core"]["rules"].append("GHRefLink_core")
        config["components"]["core"]["rules"].append("linkify")
        config["components"]["block"]["rules"].append("table")
        config["components"]["inline"]["rules"].extend(["strikethrough", "linkify"])
        config["components"]["inline"]["rules2"].append("strikethrough")
        config["options"]["linkify"] = True
        config["options"]["html"] = True
        return config


class Render:
    def __init__(self, lang: Locale = DEFAULT_LANGUAGE, provider_class: BaseDataProvider = RawGithubProvider, base_url: t.Optional[str] = None) -> None:
        compile_translations()
        if base_url is None:
            base_url = CSAUTO_BASE_URL
        self.base_url = URL(CSAUTO_BASE_URL)
        self.lang = lang
        self.translation = Translations.load(dirname=Paths.LANGUAGES_DIR, locales=self.lang)
        self.provider: BaseDataProvider = provider_class()
        self.markdown = MarkdownIt()
        self.gh_ref = GHReferenceRenderer()
        self.gh_ref.cache_all()
        self.markdown.use(self.gh_ref)
        self.markdown.configure(gfm_like_custom.make())
        
        self.engine = Environment(loader=FileSystemLoader(Paths.TEMPLATES_DIR), extensions=["jinja2.ext.i18n"])
        self.engine.install_gettext_translations(self.translation, newstyle=True)
        # self.engine.install_null_translations(newstyle=True)
        
        self.engine.globals["meta_disabled"] = CSAUTO_DISABLE_META
        self.engine.globals["base_url"] = str(base_url)
        self.engine.globals["language"] = lang
        self.engine.globals["languages"] = SUPPORTED_LANGUAGES
        self.engine.globals["len_languages"] = len(SUPPORTED_LANGUAGES)
        self.engine.globals["root_level"] = int(self.lang is not DEFAULT_LANGUAGE)  # 1 / 0
        self.engine.globals["path_prefix"] = ('/'.join(('..', )) * int(self.lang is not DEFAULT_LANGUAGE)) + "/" * int(self.lang is not DEFAULT_LANGUAGE)
        self.engine.globals["meta_available_language"] = json.dumps([{"@type": "Language", "name": x.english_name} for x in SUPPORTED_LANGUAGES])
        self.engine.globals["get_language_home_a"] = self.get_language_home_a
    
    def get_language_home_a(self, lang: Locale):
        return f'<a href="/{lang.language if lang is not DEFAULT_LANGUAGE else ''}">{lang.get_language_name().capitalize()} ({lang.get_language_name(self.lang).capitalize()})</a>'
    
    def get_filename(self, name: str):
        # Maybe will be needed in future
        return f"{name}.jinja"
    
    def render_index(self):
        faq_html = self.markdown.render(self.provider.get_faq(self.lang.language))
        latest_version = self.provider.get_version()
        return self.engine.get_template(self.get_filename("index")).render(active_nav="home", faq=faq_html, canon_link=self.base_url, latest_version=latest_version)
    
    def render_changelog(self):
        changelog_md = self.provider.get_changelog()
        logger.debug(f"Got {len(changelog_md)} changelogs")
        changelog_html = list(map(self.markdown.render, changelog_md))
        return self.engine.get_template(self.get_filename("changelog")).render(active_nav="changelog", changelogs=changelog_html, canon_link=self.base_url.join("/changelog"))
    
    def just_render(self, name: str, path: str):
        return self.engine.get_template(self.get_filename(name)).render(active_nav=name, canon_link=self.base_url.join(path))


if __name__ == '__main__':
    r = Render()
    r.render_index()
    r.render_changelog()
