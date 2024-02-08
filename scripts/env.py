import os

from loguru import logger

try:
    import dotenv
    dotenv.load_dotenv()
except ImportError:
    pass


def _log_value_decor(func):
    def decor(*args, log_value: bool = True, **kwargs):
        name = kwargs.get("name") or args[0]
        val = func(*args, **kwargs)
        if log_value:
            logger.debug(f"{name}={val}")
        return val
    return decor

class Env:
    @staticmethod
    @_log_value_decor
    def bool(name: str, default: bool, log_value: bool = True) -> bool:
        val = os.environ.get(name, default=str(default)).lower() in ("1", "true", "t", "y", "yes", "ok", "on")
        return val


    @staticmethod
    @_log_value_decor
    def int(name: str, default: int, log_value: bool = True) -> int:
        val_raw = os.environ.get(name, str(default))
        try:
            val = int(val_raw)
            return val
        except ValueError:
            logger.warning(f"Can't parse '{name}={val_raw}'")
        return default


    @staticmethod
    @_log_value_decor
    def str(name: str, default: str, log_value: bool = True) -> str:
        return os.environ.get(name, default)


LOG_ENV_VALUES = Env.bool("LOG_ENV_VALUES", True, log_value=True)

CSAUTO_LIVE_PROVIDER = Env.str("CSAUTO_LIVE_PROVIDER", default="github", log_value=LOG_ENV_VALUES)
CSAUTO_LOAD_GH_CACHE = Env.bool("CSAUTO_LOAD_GH_CACHE", False, log_value=LOG_ENV_VALUES)
CSAUTO_BASE_URL = Env.str("CSAUTO_BASE_URL", "https://csauto.vercel.app/", log_value=True)  # Used for canonical urls
CSAUTO_GH_REPO = Env.str("CSAUTO_GH_REPO", default="MurkyYT/CSAuto", log_value=True)
CSAUTO_DEFAULT_BRANCH = Env.str("CSAUTO_DEFAULT_BRANCH", default="master", log_value=True)
