import os

from loguru import logger

from shared import Paths, DEFAULT_LANGUAGE
from render import Render

INDEX_PATH = os.path.join(Paths.WEB_ROOT_DIR, "index.html")
CHANGELOG_PATH = os.path.join(Paths.WEB_ROOT_DIR, "changelog.html")

def main():
    rend = Render(lang=DEFAULT_LANGUAGE)
    # Render index.html
    logger.info("Rendering index.html")
    try:
        os.remove(INDEX_PATH)
    except FileNotFoundError:
        pass
    with open(INDEX_PATH, mode="w+", encoding="utf-8") as f:
        f.write(rend.render_index())
    # Render changelog.html
    logger.info("Rendering changelog.html")
    try:
        os.remove(CHANGELOG_PATH)
    except FileNotFoundError:
        pass
    with open(CHANGELOG_PATH, mode="w+", encoding="utf-8") as f:
        f.write(rend.render_changelog())


if __name__ == "__main__":
    main()
