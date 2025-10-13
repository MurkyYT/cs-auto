import os
import json

from httpx import Client, URL
from loguru import logger

import typing as t


GH_TOKEN_ENV = "GITHUB_TOKEN"

class GHClient:
    def __init__(self, default_repo: str, token: t.Optional[str] = None,
                 load_cache: bool = False, cache_path: t.Optional[str | os.PathLike] = None) -> None:
        self.default_repo = default_repo
        self.load_cache, self.cache_path = load_cache, cache_path
        headers = {"X-GitHub-Api-Version": "2022-11-28",
                   "accept": "application/vnd.github+json"}
        if token is None:
            if GH_TOKEN_ENV in os.environ:
                token = os.environ[GH_TOKEN_ENV]
        if token:
            headers["Authorization"] = "Bearer " + token
        self.client = Client(headers=headers, follow_redirects=True)
        self.cache = list()
        if self.load_cache and self.cache_path is not None:
            try:
                with open(self.cache_path, mode="r", encoding="utf-8") as f:
                    self.cache.extend(json.load(f))
            except FileNotFoundError:
                logger.warning("GitHub cache not found")
        
    def is_this_default_repo(self, repo_owner: str, repo: str):
        return f"{repo_owner}/{repo}" == self.default_repo
    
    def list_issues(self, page: int = 1, per_page: int = 30, repo: t.Optional[str] = None):
        if repo is None:
            repo = self.default_repo
        logger.trace(f"List issues {repo} (page={page}, per_page={per_page})")
        resp = self.client.get(f"https://api.github.com/repos/{repo}/issues",
                               params=dict(page=page, per_page=per_page, state="all"))
        return resp.json()
    
    def get_issue(self, issue_number: int, repo: t.Optional[str]):
        if repo is None:
            repo = self.default_repo
        logger.trace(f"Get {repo}/issues/{issue_number}")
        resp = self.client.get(f"https://api.github.com/repos/{repo}/issues/{issue_number}")
        resp.raise_for_status()
        res = resp.json()
        res["_type"] = "issue"
        self.cache.append(res)
        return res
    
    def _paginate_from_url(self, link):
        resp = self.client.get(link)
        resp.raise_for_status()
        res = resp.json()
        if "next" not in resp.links:
            return res
        while "next" in resp.links:
            resp = self.client.get(resp.links["next"]['url'])
            resp.raise_for_status()
            res.extend(resp.json())
        resp.raise_for_status()
        res.extend(resp.json())
        return res
    
    def list_all_issues(self, repo: t.Optional[str] = None):
        if repo is None:
            repo = self.default_repo
        logger.trace(f"Get all issues from {repo}")
        link = URL(f"https://api.github.com/repos/{repo}/issues").copy_merge_params({"state": "all", "per_page": 100})
        res = self._paginate_from_url(link)
        res = list(filter(lambda x: "pull_request" not in x, res))
        return res
    
    def list_pulls(self, page: int = 1, per_page: int = 30, repo: t.Optional[str] = None):
        if repo is None:
            repo = self.default_repo
        logger.trace(f"List PRs {repo} (page={page}, per_page={per_page})")
        resp = self.client.get(f"https://api.github.com/repos/{repo}/pulls",
                               params=dict(page=page, per_page=per_page, state="all"))
        resp.raise_for_status()
        return resp.json()
    
    def get_pull(self, pull_number: int, repo: t.Optional[str]):
        if repo is None:
            repo = self.default_repo
        logger.trace(f"Get {repo}/pulls/{pull_number}")
        resp = self.client.get(f"https://api.github.com/repos/{repo}/pulls/{pull_number}")
        resp.raise_for_status()
        res = resp.json()
        res["_type"] = "pull"
        self.cache.append(res)
        return res
    
    def list_all_pulls(self, repo: t.Optional[str] = None):
        if repo is None:
            repo = self.default_repo
        logger.trace(f"Get all PRs from {repo}")
        res = list()
        link = URL(f"https://api.github.com/repos/{repo}/pulls").copy_merge_params({"state": "all", "per_page": 100})
        res = self._paginate_from_url(link)
        return res
    
    def contributors(self, page: int = 1, per_page: int = 30, repo: t.Optional[str] = None):
        if repo is None:
            repo = self.default_repo
        logger.trace(f"List contributors {repo} (page={page}, per_page={per_page})")
        resp = self.client.get(f"https://api.github.com/repos/{repo}/contributors",
                               params=dict(page=page, per_page=per_page))
        resp.raise_for_status()
        return resp.json()
    
    def list_all_contributors(self, repo: t.Optional[str] = None):
        if repo is None:
            repo = self.default_repo
        logger.trace(f"Get all contributors from {repo}")
        res = list()
        link = URL(f"https://api.github.com/repos/{repo}/contributors").copy_add_param("per_page", "100")
        res = self._paginate_from_url(link)
        return res
    
    def get_latest_release(self, repo: t.Optional[str] = None):
        if repo is None:
            repo = self.default_repo
        logger.trace(f"Get latest release from {repo}")
        resp = self.client.get(f"https://api.github.com/repos/{repo}/releases/latest")
        resp.raise_for_status()
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
            repo = self.default_repo
        if repo == self.default_repo:
            if res := tuple(filter(lambda x: x.get("number") == index, self.cache)):
                return res[0]
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
    
    def list_all_prs_issues(self, repo: t.Optional[str] = None):
        if repo is None:
            repo = self.default_repo
        logger.trace(f"Get all issues&PRs from {repo}")
        link = URL(f"https://api.github.com/repos/{repo}/issues").copy_merge_params({"state": "all", "per_page": 100})
        res = self._paginate_from_url(link)
        issues = list(filter(lambda x: "pull_request" not in x, res))
        prs = list(filter(lambda x: "pull_request" in x, res))
        return issues, prs
    
    def cache_all(self):
        # issues, pulls = self.list_all_issues(), self.list_all_pulls()
        issues, pulls = self.list_all_prs_issues()
        self.cache.extend(tuple(map(lambda x: dict(x, **dict(_type="issue")), issues)))
        self.cache.extend(tuple(map(lambda x: dict(x, **dict(_type="pull")), pulls)))
        contributors = self.list_all_contributors()
        self.cache.extend(tuple(map(lambda x: dict(x, **dict(_type="user")), contributors)))


if __name__ == "__main__":
    gh = GHClient("MurkyYT/CSAuto")
    gh.cache_all()
    with open(os.path.join("gh_cache.json"), mode="w+", encoding="utf-8") as f:
        json.dump(gh.cache, f, indent=4)
