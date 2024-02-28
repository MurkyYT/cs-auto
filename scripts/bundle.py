from dataclasses import dataclass
import os

from loguru import logger

from shared import Paths, DEFAULT_LANGUAGE
from render import Render

import typing as t

INDEX_PATH = os.path.join(Paths.WEB_ROOT_DIR, "index.html")
CHANGELOG_PATH = os.path.join(Paths.WEB_ROOT_DIR, "changelog.html")
FRAME_CHANGELOG_PATH = os.path.join(Paths.WEB_ROOT_DIR, "frame", "changelog.html")

@dataclass
class Page:
    web_path: str
    render: t.Callable

def main():
    rend = Render(lang=DEFAULT_LANGUAGE)
    
    pages: list[Page] = [
        Page("index.html", rend.render_index),
        Page("changelog.html", rend.render_changelog)
    ]
    # Render index.html
    for x in pages:
        logger.info(f"Rendering {x.web_path}")
        path = os.path.join(Paths.WEB_ROOT_DIR, x.web_path)
        try:
            os.remove(path)
        except FileNotFoundError:
            os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, mode="w+", encoding="utf-8") as f:
            f.write(x.render())


if __name__ == "__main__":
    main()
