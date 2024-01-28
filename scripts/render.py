from markdown_it import MarkdownIt
from loguru import logger
from jinja2 import Environment, FileSystemLoader

from shared import LANGUAGES, DEFAULT_LANGUAGE, Paths
from get_data import BaseDataProvider, RawGithubProvider



class Render:
    def __init__(self, lang: LANGUAGES = DEFAULT_LANGUAGE, provider_class: BaseDataProvider = RawGithubProvider) -> None:
        self.lang = lang
        self.engine = Environment(loader=FileSystemLoader(Paths.TEMPLATES_DIR))
        self.provider: BaseDataProvider = provider_class()
        self.markdown = MarkdownIt(config="gfm-like")
    
    def get_filename(self, name: str):
        # Maybe will be needed in future
        return f"{name}.jinja"
    
    def render_index(self):
        faq_html = self.markdown.render(self.provider.get_faq(self.lang))
        return self.engine.get_template(self.get_filename("index")).render(active_nav="home", faq=faq_html)
    
    def render_changelog(self):
        changelog_md = self.provider.get_changelog()
        logger.debug(f"Got {len(changelog_md)} changelogs")
        changelog_html = list(map(self.markdown.render, changelog_md))
        return self.engine.get_template(self.get_filename("changelog")).render(active_nav="changelog", changelogs=changelog_html)
