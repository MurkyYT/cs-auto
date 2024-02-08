import re

from markdown_it import MarkdownIt
from markdown_it.token import Token
from markdown_it.rules_core.state_core import StateCore
from markdown_it.common.utils import arrayReplaceAt, isLinkClose, isLinkOpen
from loguru import logger

from github_cl import GHClient
from env import CSAUTO_GH_REPO

import typing as t


REF_REGEX = re.compile(r"(?:(?:https://)?github\.com\/)?(?:(?P<owner>(?:[A-Za-z]|\d|-)+)/)?(?P<repo>(?:[A-Za-z]|\d|-)+)?(?:GH-|#|\/(?P<ref_type>issues|pull)\/)(?P<index>\d+)")
USER_REGEX = re.compile(r"@([a-z0-9](?:-(?=[a-z0-9])|[a-z0-9]){0,38}(?<=[a-z0-9]))", re.IGNORECASE)  # https://stackoverflow.com/a/30281147/20533050


class GHReferenceRenderer(GHClient):
    def install(self, md: MarkdownIt):
        md.core.ruler.push("GHRefLink_core", self.ref_link_core)

    def __call__(self, *args, **kwargs):
        return self.install(*args, **kwargs)

    def get_data_from_reference(self, ref_match: str | re.Match):
        if isinstance(ref_match, str):
            ref_match = REF_REGEX.match(ref_match)
        if ref_match.group("owner") and ref_match.group("repo"):
            return self.try_index(int(ref_match.group("index")), repo=f"{ref_match.group('owner')}/{ref_match.group('repo')}")
        else:
            return self.try_index(int(ref_match.group("index")))
    
    def ref_link_core(self, state: StateCore):
        """Rule for identifying any plain-text references to GitHub users and PRs/Issues"""
        # sth a-like rules_core/linkify
        for inline_token in state.tokens:
            if inline_token.type != "inline":
                continue
            tokens = inline_token.children
            html_link_level = 0
            i = len(tokens)
            while i >= 1:
                i -= 1
                current_token = tokens[i]
                # Skip markdown link, but not automatically created
                if current_token.type == "link_close" and current_token.info != "auto":
                    i -= 1
                    while tokens[i].level != current_token.level and tokens[i].type != "link_open":
                        i -= 1
                    continue
                # Skip html tag links
                if current_token.type == "html_inline":
                    if isLinkOpen(current_token.content) and html_link_level > 0:
                        html_link_level -= 1
                    if isLinkClose(current_token.content):
                        html_link_level += 1
                if html_link_level > 0:
                    continue
                # Skipping non-text
                if current_token.type != "text":
                    continue

                # USERS
                
                text = current_token.content
                nodes = list()
                level = current_token.level
                last_pos = 0
                for user_match in USER_REGEX.finditer(text):
                    pos = user_match.span()[0]

                    if pos > last_pos:
                        token = Token("text", "", 0)
                        token.content = text[last_pos:pos]
                        token.level = level
                        nodes.append(token)

                    token = Token("link_open", "a", 1)
                    token.attrs = {"href": f"https://github.com/{user_match.group(1)}",
                                   "data-tooltip": "GitHub profile"}
                    token.level = level
                    level += 1
                    nodes.append(token)

                    token = Token("text", "", 0)
                    token.content = user_match.group(0)
                    token.level = level
                    nodes.append(token)

                    token = Token("link_close", "a", -1)
                    level -= 1
                    token.level = level
                    nodes.append(token)

                    last_pos = user_match.span()[1]

                    if last_pos < len(text):
                        token = Token("text", "", 0)
                        token.content = text[last_pos:]
                        token.level = level
                        nodes.append(token)

                    tokens = arrayReplaceAt(tokens, i, nodes)
                    inline_token.children = tokens

                # PR / ISSUES

                last_pos = 0
                for ref_match in REF_REGEX.finditer(text):
                    data = self.get_data_from_reference(ref_match)
                    if not data:
                        continue

                    pos = ref_match.span()[0]

                    if pos > last_pos:
                        token = Token("text", "", 0)
                        token.content = text[last_pos:pos]
                        token.level = level
                        nodes.append(token)

                    token = Token("link_open", "a", 1)
                    token.attrs = {"href": data["html_url"],
                                   "data-tooltip": ("Pull Request" if data["_type"] == "pull" else "Issue") + f": {data['title']}"}
                    token.level = level
                    level += 1
                    nodes.append(token)

                    token = Token("text", "", 0)
                    token.content = f"#{data['number']}"
                    token.level = level
                    nodes.append(token)

                    token = Token("link_close", "a", -1)
                    level -= 1
                    token.level = level
                    nodes.append(token)

                    last_pos = ref_match.span()[1]

                    if last_pos < len(text):
                        token = Token("text", "", 0)
                        token.content = text[last_pos:]
                        token.level = level
                        nodes.append(token)

                    tokens = arrayReplaceAt(tokens, i, nodes)
                    inline_token.children = tokens
