from dataclasses import dataclass
import os

from babel import Locale
from loguru import logger

from shared import Paths, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE
from render import Render

import typing as t

INDEX_PATH = os.path.join(Paths.WEB_ROOT_DIR, "index.html")
CHANGELOG_PATH = os.path.join(Paths.WEB_ROOT_DIR, "changelog.html")
FRAME_CHANGELOG_PATH = os.path.join(Paths.WEB_ROOT_DIR, "frame", "changelog.html")

@dataclass
class Page:
    web_path: str
    render: t.Callable
    
    only_original_language: bool = False

def build_lang(folder_path, lang: Locale):
    rend = Render(lang=lang)
    
    pages: list[Page] = [
        Page("index.html", rend.render_index),
        Page("changelog.html", rend.render_changelog, only_original_language=True)
    ]
    # Render index.html
    for x in pages:
        if lang is not DEFAULT_LANGUAGE and x.only_original_language:
            logger.info(f"{x.web_path} [{lang}] skipped [Only Original Language]")
            continue
        logger.info(f"Rendering {x.web_path} [{lang}]")
        path = os.path.join(folder_path, x.web_path)
        try:
            os.remove(path)
        except FileNotFoundError:
            os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, mode="w+", encoding="utf-8") as f:
            f.write(x.render())


def main():
    for lang in SUPPORTED_LANGUAGES:
        path = Paths.WEB_ROOT_DIR
        if lang is not DEFAULT_LANGUAGE:
            path = os.path.join(path, lang.language)
        build_lang(folder_path=path, lang=lang)


if __name__ == "__main__":
    main()
