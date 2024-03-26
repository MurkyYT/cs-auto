import os

from fastapi import FastAPI
from fastapi.responses import HTMLResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles
from loguru import logger
import uvicorn

from env import CSAUTO_LIVE_PROVIDER
from render import Render
from get_data import LocalFileProvider, RawGithubProvider
from shared import Paths, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE_ID, LANGUAGES_IDS_STR_LITERAL

try:
    import dotenv
    dotenv.load_dotenv()
except ImportError:
    pass

app = FastAPI()
app.mount("/css", StaticFiles(directory=os.path.join(Paths.WEB_ROOT_DIR, "css")), name="css")
app.mount("/public", StaticFiles(directory=os.path.join(Paths.WEB_ROOT_DIR, "public")), name="public")

renders = {x.language: Render(provider_class={"local": LocalFileProvider, "github": RawGithubProvider}[CSAUTO_LIVE_PROVIDER], lang=x) for x in SUPPORTED_LANGUAGES}

@app.get("/")
async def root():
    return HTMLResponse(renders[DEFAULT_LANGUAGE_ID].render_index())

@app.get("/changelog")
async def changelog():
    return HTMLResponse(renders[DEFAULT_LANGUAGE_ID].render_changelog())

@app.get("/{lang}/")
async def root_lang(lang: LANGUAGES_IDS_STR_LITERAL):
    return HTMLResponse(renders[lang].render_index())

@app.get("/api/colors")
async def colors():
    return PlainTextResponse(renders[DEFAULT_LANGUAGE_ID].provider.get_colors())

@app.get("/api/version")
async def version():
    return PlainTextResponse(renders[DEFAULT_LANGUAGE_ID].provider.get_version())

# poetry run uvicorn live_dev:app --reload --reload-dir ..
if __name__ == "__main__":
    uvicorn.run(app=app)
