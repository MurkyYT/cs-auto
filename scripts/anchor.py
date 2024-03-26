# Modified code from mdit-py-plugins
import re
from typing import Callable, Set

from markdown_it import MarkdownIt
from markdown_it.rules_core import StateCore
from markdown_it.token import Token


def anchors_plugin(md: MarkdownIt) -> None:
    md.core.ruler.push(
        "anchor",
        _make_anchors_func(),
    )


def _make_anchors_func() -> Callable[[StateCore], None]:
    def _anchor_func(state: StateCore) -> None:
        for idx, token in enumerate(state.tokens):
            if token.type != "heading_open":
                continue
            level = int(token.tag[1])
            # Disabling header level check, just find first with sem-ver
            """if level != 3: # All version headers are H3
                continue"""
            inline_token = state.tokens[idx + 1]
            assert inline_token.children is not None
            title = "".join(
                child.content
                for child in inline_token.children
                if child.type in ["text", "code_inline"]
            )
            # https://regex101.com/library/gG8cK7 / https://github.com/semver/semver.org/issues/59
            match = re.search(r"""(?P<MAJOR>0|(?:[1-9]\d*))\.(?P<MINOR>0|(?:[1-9]\d*))\.(?P<PATCH>0|(?:[1-9]\d*))(?:-(?P<prerelease>(?:0|(?:[1-9A-Za-z-][0-9A-Za-z-]*))(?:\.(?:0|(?:[1-9A-Za-z-][0-9A-Za-z-]*)))*))?(?:\+(?P<build>(?:0|(?:[1-9A-Za-z-][0-9A-Za-z-]*))(?:\.(?:0|(?:[1-9A-Za-z-][0-9A-Za-z-]*)))*))?""", title)
            if match is None:
                continue
            slug = slugify(title[match.start():match.end()])
            token.attrSet("id", slug)

            link_open = Token(
                "link_open",
                "a",
                1,
            )
            link_open.attrSet("class", "header-anchor")
            link_open.attrSet("href", f"#{slug}")
            link_tokens = [
                link_open,
                Token("html_block", "", 0, content="#"),  # PERMALINK SYMBOL
                Token("link_close", "a", -1),
            ]
            inline_token.children.extend(
                ([Token("text", "", 0, content=" ")])
                + link_tokens
            )
            return # We need only one version header at the begin of each

    return _anchor_func


def slugify(title: str) -> str:
    return re.sub(r"[^\w\u4e00-\u9fff\- ]", "", title.strip().lower().replace(" ", "-"))
