from enum import StrEnum
import os

import babel
from babel.messages import frontend as babel_utils
from httpx import URL

from env import CSAUTO_GH_REPO, CSAUTO_DEFAULT_BRANCH as DEFAULT_BRANCH, GITHUB_TOKEN

import typing as t

class Paths:
    SCRIPTS_DIR = os.path.dirname(__file__)
    ROOT_DIR = os.path.dirname(SCRIPTS_DIR)
    GH_CACHE = os.path.join(ROOT_DIR, "gh_cache.json")
    TEMPLATES_DIR = os.path.join(ROOT_DIR, "templates")
    WEB_ROOT_DIR = os.path.join(ROOT_DIR, "www")
    LANGUAGES_DIR = os.path.join(ROOT_DIR, "languages")

LANGUAGES_IDS_STR_LITERAL = t.Literal["en", "ru"]
SUPPORTED_LANGUAGES = [babel.Locale('en'), babel.Locale('ru')]
DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0]
DEFAULT_LANGUAGE_ID = DEFAULT_LANGUAGE.language

class URLS:
    GH_REPO = URL(f"https://github.com/{CSAUTO_GH_REPO}/")
    CHANGELOG_LINK = GH_REPO.join(f"blob/{DEFAULT_BRANCH}/Docs/FullChangelog.MD")
    README_LINK: dict[str, URL] = {"en": GH_REPO.copy_with(fragment="csauto"),
                                   "ru": GH_REPO.join(f"blob/{DEFAULT_BRANCH}/Docs/README_ru.md")}
    
    RAW_GH = URL(f"https://raw.githubusercontent.com/{CSAUTO_GH_REPO}/{DEFAULT_BRANCH}/")
    RAW_CHANGELOG = RAW_GH.join("Data/full_changelog.json")
    RAW_COLORS = RAW_GH.join("Data/colors")
    RAW_README: dict[str, URL] = {"en": RAW_GH.join("README.md"),
                                  "ru": RAW_GH.join("Docs/README_ru.md")}
    
    REPO_API = URL(f"https://api.github.com/repos/{CSAUTO_GH_REPO}/")
    RELEASES_API = REPO_API.join("releases")


def compile_translations():
    compile = babel_utils.CompileCatalog()
    compile.directory = Paths.LANGUAGES_DIR
    compile.ensure_finalized()
    compile.run()
