import os
import json

from httpx import Client
from loguru import logger

from shared import Paths
from env import CSAUTO_LOAD_GH_CACHE, CSAUTO_GH_REPO

import typing as t

try:
    import dotenv
    dotenv.load_dotenv()
except ImportError:
    pass


class GHClient:
    def __init__(self, token: t.Optional[str] = None) -> None:
        headers = {"X-GitHub-Api-Version": "2022-11-28",
                   "accept": "application/vnd.github+json"}
        if token:
            headers["Authorization"] = "Bearer " + token
        self.client = Client(headers=headers, follow_redirects=True)
        self.cache = list()
        if CSAUTO_LOAD_GH_CACHE:
            try:
                with open(os.path.join(Paths.ROOT_DIR, "gh_cache.json"), mode="r", encoding="utf-8") as f:
                    self.cache.extend(json.load(f))
            except FileNotFoundError:
                logger.warning("gh_cache.json not found")
        
    @staticmethod
    def is_this_default_repo(repo_owner: str, repo: str):
        return f"{repo_owner}/{repo}" == CSAUTO_GH_REPO
    
    def list_issues(self, page: int = 1, per_page: int = 30, repo: t.Optional[str] = None):
        if repo is None:
            repo = CSAUTO_GH_REPO
        logger.trace(f"List issues {repo} (page={page}, per_page={per_page})")
        resp = self.client.get(f"https://api.github.com/repos/{repo}/issues",
                               params=dict(page=page, per_page=per_page, state="all"))
        return resp.json()
    
    def get_issue(self, issue_number: int, repo: t.Optional[str]):
        if repo is None:
            repo = CSAUTO_GH_REPO
        logger.trace(f"Get {repo}/issues/{issue_number}")
        resp = self.client.get(f"https://api.github.com/repos/{repo}/issues/{issue_number}")
        resp.raise_for_status()
        res = resp.json()
        res["_type"] = "issue"
        self.cache.append(res)
        return res
    
    def list_all_issues(self, repo: t.Optional[str] = None):
        if repo is None:
            repo = CSAUTO_GH_REPO
        logger.trace(f"Get all issues from {repo}")
        res = list()
        while "link" in (resp := self.client.get(f"https://api.github.com/repos/{repo}/issues", params=dict(state="all"))).headers:
            res.extend(resp.json())
        res.extend(resp.json())
        return res
    
    def list_pulls(self, page: int = 1, per_page: int = 30, repo: t.Optional[str] = None):
        if repo is None:
            repo = CSAUTO_GH_REPO
        logger.trace(f"List PRs {repo} (page={page}, per_page={per_page})")
        resp = self.client.get(f"https://api.github.com/repos/{repo}/pulls",
                               params=dict(page=page, per_page=per_page, state="all"))
        return resp.json()
    
    def get_pull(self, pull_number: int, repo: t.Optional[str]):
        if repo is None:
            repo = CSAUTO_GH_REPO
        logger.trace(f"Get {repo}/pulls/{pull_number}")
        resp = self.client.get(f"https://api.github.com/repos/{repo}/pulls/{pull_number}")
        resp.raise_for_status()
        res = resp.json()
        res["_type"] = "pull"
        self.cache.append(res)
        return res
    
    def list_all_pulls(self, repo: t.Optional[str] = None):
        if repo is None:
            repo = CSAUTO_GH_REPO
        logger.trace(f"Get all PRs from {repo}")
        res = list()
        while "link" in (resp := self.client.get(f"https://api.github.com/repos/{repo}/pulls", params=dict(state="all"))).headers:
            res.extend(resp.json())
        res.extend(resp.json())
        return res
    
    def contributors(self, page: int = 1, per_page: int = 30, repo: t.Optional[str] = None):
        if repo is None:
            repo = CSAUTO_GH_REPO
        logger.trace(f"List contributors {repo} (page={page}, per_page={per_page})")
        resp = self.client.get(f"https://api.github.com/repos/{repo}/contributors",
                               params=dict(page=page, per_page=per_page))
        return resp.json()
    
    def list_all_contributors(self, repo: t.Optional[str] = None):
        if repo is None:
            repo = CSAUTO_GH_REPO
        logger.trace(f"Get all contributors from {repo}")
        res = list()
        while "link" in (resp := self.client.get(f"https://api.github.com/repos/{repo}/contributors")).headers:
            res.extend(resp.json())
        res.extend(resp.json())
        return res
    
    def get_latest_release(self, repo: t.Optional[str] = None):
        if repo is None:
            repo = CSAUTO_GH_REPO
        logger.trace(f"Get latest release from {repo}")
        resp = self.client.get(f"https://api.github.com/repos/{repo}/releases/latest")
        return resp.json()
    
    def get_user(self, user: str, cached=True):
        if cached:
            if res := tuple(filter(lambda x: x["_type"] == "user" and x.get("login") == user, self.cache)):
                return res[0]
        logger.trace(f"Get user {user}")
        resp = self.client.get(f"https://api.github.com/users/{user}")
        resp.raise_for_status()
        res = resp.json()
        res["_type"] = "user"
        self.cache.append(res)
    
    def try_user(self, user: str):
        try:
            self.get_user(user)
        except Exception as e:
            logger.opt(exception=e).warning(f"Can't find user {user}")
    
    def try_index(self, index: int, repo: t.Optional[str] = None):
        if repo is None:
            repo = CSAUTO_GH_REPO
        if repo == CSAUTO_GH_REPO:
            if res := tuple(filter(lambda x: x["_type"] == "issue" and x.get("number") == index, self.cache)):
                if "pull_request" not in res[0]:
                    return res[0]  # Return issue
                return tuple(filter(lambda x: x["_type"] == "pull" and x.get("number") == index, self.cache))[0]  # Return PR
        logger.debug(f"Can't find {repo}#{index} in cache. Requesting from API")
        try:
            issue = self.get_issue(index, repo=repo)
        except Exception as e:
            logger.opt(exception=e).warning(f"Couldn't find {repo}#{index}")
            return None
        if "pull_request" in issue:
            try:
                pull = self.get_pull(index, repo=repo)
            except Exception as e:
                logger.opt(exception=e).warning(f"Couldn't find {repo}#{index}")
                return None
            return pull
        return issue
    
    def cache_all(self):
        issues = self.list_all_issues()
        self.cache.extend(tuple(map(lambda x: dict(x, **dict(_type="issue")), issues)))
        pulls = self.list_all_pulls()
        self.cache.extend(tuple(map(lambda x: dict(x, **dict(_type="pull")), pulls)))
        contributors = self.list_all_contributors()
        self.cache.extend(tuple(map(lambda x: dict(x, **dict(_type="user")), contributors)))


if __name__ == "__main__":
    gh = GHClient()
    gh.cache_all()
    with open(os.path.join(Paths.ROOT_DIR, "gh_cache.json"), mode="w+", encoding="utf-8") as f:
        json.dump(gh.cache, f, indent=4)
