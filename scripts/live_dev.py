import os

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

from render import Render
from get_data import LocalFileProvider
from shared import Paths

app = FastAPI()
app.mount("/css", StaticFiles(directory=os.path.join(Paths.WEB_ROOT_DIR, "css")), name="css")
app.mount("/public", StaticFiles(directory=os.path.join(Paths.WEB_ROOT_DIR, "public")), name="public")

rend = Render(provider_class=LocalFileProvider)

@app.get("/index.html")
async def root():
    return HTMLResponse(rend.render_index())

@app.get("/changelog.html")
async def changelog():
    return HTMLResponse(rend.render_changelog()) 

# poetry run uvicorn live_dev:app --reload --reload-dir ..
if __name__ == "__main__":
    uvicorn.run(app=app)
