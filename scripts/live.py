import os

from fastapi import FastAPI
from fastapi.responses import HTMLResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

from render import Render
from get_data import LocalFileProvider, RawGithubProvider
from shared import Paths

try:
    import dotenv
    dotenv.load_dotenv()
except ImportError:
    pass

app = FastAPI()
app.mount("/css", StaticFiles(directory=os.path.join(Paths.WEB_ROOT_DIR, "css")), name="css")
app.mount("/public", StaticFiles(directory=os.path.join(Paths.WEB_ROOT_DIR, "public")), name="public")

rend = Render(provider_class={"local": LocalFileProvider, "github": RawGithubProvider}[os.environ.get("CSAUTO_LIVE_PROVIDER", "github")])

@app.get("/")
async def root():
    return HTMLResponse(rend.render_index())

@app.get("/changelog")
async def changelog():
    return HTMLResponse(rend.render_changelog())

@app.get("/api/colors")
async def colors():
    return PlainTextResponse(rend.provider.get_colors())

# poetry run uvicorn live_dev:app --reload --reload-dir ..
if __name__ == "__main__":
    uvicorn.run(app=app)
