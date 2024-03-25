from datetime import datetime
from functools import cache
import os

import httpx
from loguru import logger

from shared import URLS, LANGUAGES_IDS_STR_LITERAL, DEFAULT_LANGUAGE_ID

import typing as t

try:
    import dotenv
    dotenv.load_dotenv()
except ImportError:
    pass

class BaseDataProvider:
    def get_readme(self, lang: LANGUAGES_IDS_STR_LITERAL = DEFAULT_LANGUAGE_ID) -> str:
        raise NotImplementedError
    
    def get_faq(self, lang: LANGUAGES_IDS_STR_LITERAL = DEFAULT_LANGUAGE_ID) -> str:
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
    
    def get_colors(self) -> str:
        raise NotImplementedError
    
    def get_version(self) -> str:
        raise NotImplementedError


class RawGithubProvider(BaseDataProvider):
    @cache
    def get_readme(self, lang: LANGUAGES_IDS_STR_LITERAL = DEFAULT_LANGUAGE_ID) -> str:
        resp = httpx.get(url=URLS.RAW_README[lang])
        return resp.text
    
    @cache
    def get_changelog_md(self) -> str:
        resp = httpx.get(url=URLS.RAW_CHANGELOG)
        return resp.text
    
    def get_changelog(self) -> list[str]:
        changelog_md = self.get_changelog_md()
        return list(changelog_md.split("<!--Version split-->"))
    
    @cache
    def get_colors(self) -> str:
        resp = httpx.get(url=URLS.RAW_COLORS)
        return resp.text
    
    @cache
    def get_version(self) -> str:
        raw_resp = httpx.get(URLS.RELEASES_API, headers={"X-GitHub-Api-Version": "2022-11-28"})
        logger.debug(f"Releases response: {raw_resp.status_code}")
        resp = raw_resp.json()
        return max(resp, key=lambda x: datetime.fromisoformat(x['created_at']))['tag_name']


class LocalFileProvider(RawGithubProvider):
    def get_readme(self, lang: LANGUAGES_IDS_STR_LITERAL = DEFAULT_LANGUAGE_ID) -> str:
        with open(os.environ[f"CSAUTO_README_{lang.value.upper()}"], mode="r", encoding="utf-8") as f:
            return f.read()
    
    def get_changelog_md(self) -> str:
        with open(os.environ["CSAUTO_CHANGELOG"], mode="r", encoding="utf-8") as f:
            return f.read()
    
    def get_colors(self) -> str:
        return "54,183,82\n59,198,90"
    
    def get_version(self) -> str:
        return "7.0.0"
