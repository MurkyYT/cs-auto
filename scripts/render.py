from httpx import URL
from markdown_it import MarkdownIt
from markdown_it.presets import commonmark
from markdown_it.utils import PresetType
from loguru import logger
from jinja2 import Environment, FileSystemLoader

from env import CSAUTO_BASE_URL
from shared import LANGUAGES, DEFAULT_LANGUAGE, Paths
from github_md import GHReferenceRenderer
from get_data import BaseDataProvider, RawGithubProvider

import typing as t


class gfm_like_custom:  # noqa: N801
    """GitHub Flavoured Markdown (GFM) like.

    This adds the linkify, table and strikethrough components to CommmonMark.

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
    def __init__(self, lang: LANGUAGES = DEFAULT_LANGUAGE, provider_class: BaseDataProvider = RawGithubProvider, base_url: t.Optional[str] = None) -> None:
        if base_url is None:
            base_url = CSAUTO_BASE_URL
        self.base_url = URL(CSAUTO_BASE_URL)
        self.lang = lang
        self.engine = Environment(loader=FileSystemLoader(Paths.TEMPLATES_DIR))
        self.provider: BaseDataProvider = provider_class()
        self.markdown = MarkdownIt()
        self.gh_ref = GHReferenceRenderer()
        self.gh_ref.cache_all()
        self.markdown.use(self.gh_ref)
        self.markdown.configure(gfm_like_custom.make())
    
    def get_filename(self, name: str):
        # Maybe will be needed in future
        return f"{name}.jinja"
    
    def render_index(self):
        faq_html = self.markdown.render(self.provider.get_faq(self.lang))
        return self.engine.get_template(self.get_filename("index")).render(active_nav="home", faq=faq_html, canon_link=self.base_url)
    
    def render_changelog(self):
        changelog_md = self.provider.get_changelog()
        logger.debug(f"Got {len(changelog_md)} changelogs")
        changelog_html = list(map(self.markdown.render, changelog_md))
        return self.engine.get_template(self.get_filename("changelog")).render(active_nav="changelog", changelogs=changelog_html, canon_link=self.base_url.join("/changelog"))


if __name__ == '__main__':
    r = Render()
    r.render_index()
    r.render_changelog()
