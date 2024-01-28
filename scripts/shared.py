from enum import StrEnum
import os

from httpx import URL

class Paths:
    SCRIPTS_DIR = os.path.dirname(__file__)
    ROOT_DIR = os.path.dirname(SCRIPTS_DIR)
    TEMPLATES_DIR = os.path.join(ROOT_DIR, "templates")
    WEB_ROOT_DIR = os.path.join(ROOT_DIR, "www")

CSAUTO_GH_REPO = "MurkyYT/CSAuto"
DEFAULT_BRANCH = "master"

class LANGUAGES(StrEnum):
    EN = "en"
    RU = "ru"

DEFAULT_LANGUAGE = LANGUAGES.EN

class URLS:
    GH_REPO = URL(f"https://github.com/{CSAUTO_GH_REPO}/")
    CHANGELOG_LINK = GH_REPO.join(f"blob/{DEFAULT_BRANCH}/Docs/FullChangelog.MD")
    README_LINK: dict[LANGUAGES, URL] = {LANGUAGES.EN: GH_REPO.copy_with(fragment="csauto"),
                                         LANGUAGES.RU: GH_REPO.join(f"blob/{DEFAULT_BRANCH}/Docs/README_ru.md")}
    
    RAW_GH = URL(f"https://raw.githubusercontent.com/{CSAUTO_GH_REPO}/{DEFAULT_BRANCH}/")
    RAW_CHANGELOG = RAW_GH.join("Docs/FullChangelog.MD")
    RAW_COLORS = RAW_GH.join("Data/colors")
    RAW_README: dict[LANGUAGES, URL] = {LANGUAGES.EN: RAW_GH.join("README.md"),
                                        LANGUAGES.RU: RAW_GH.join("Docs/README_ru.md")}
