
import os
import httpx
from loguru import logger

from shared import DEFAULT_LANGUAGE, LANGUAGES, URLS

import typing as t

try:
    import dotenv
    dotenv.load_dotenv()
except ImportError:
    pass

class BaseDataProvider:
    def get_readme(self, lang: LANGUAGES = DEFAULT_LANGUAGE) -> str:
        raise NotImplementedError
    
    def get_faq(self, lang: LANGUAGES = DEFAULT_LANGUAGE) -> str:
        FAQ_BEGIN_STRING = "## FAQ"
        FAQ_END_STRING = "\n## "
        
        readme = self.get_readme(lang)
        faq_begin_index = readme.find(FAQ_BEGIN_STRING)
        if faq_begin_index == -1:
            logger.error("Failed to find FAQ")
            raise IndexError
        faq_begin_index += len(FAQ_BEGIN_STRING)
        faq_end_index = readme.find(FAQ_END_STRING, faq_begin_index)
        if faq_end_index == -1:
            logger.warning("Failed to find end of FAQ")
            faq_end_index = len(readme)
        return readme[faq_begin_index:faq_end_index]
    
    def get_changelog(self) -> list[str]:
        raise NotImplementedError


class RawGithubProvider(BaseDataProvider):
    def get_readme(self, lang: LANGUAGES = DEFAULT_LANGUAGE) -> str:
        resp = httpx.get(url=URLS.RAW_README[lang])
        return resp.text
    
    def get_changelog_md(self) -> str:
        resp = httpx.get(url=URLS.RAW_CHANGELOG)
        return resp.text
    
    def get_changelog(self) -> list[str]:
        changelog_md = self.get_changelog_md()
        return list(changelog_md.split("<!--Version split-->"))


class LocalFileProvider(RawGithubProvider):
    def get_readme(self, lang: LANGUAGES = DEFAULT_LANGUAGE) -> str:
        with open(os.environ[f"CSAUTO_README_{lang.value.upper()}"], mode="r", encoding="utf-8") as f:
            return f.read()
    
    def get_changelog_md(self) -> str:
        with open(os.environ["CSAUTO_CHANGELOG"], mode="r", encoding="utf-8") as f:
            return f.read()