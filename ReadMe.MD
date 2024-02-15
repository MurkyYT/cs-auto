# cs-auto-web

Source code of [CSAuto website](https://csauto.vercel.app). ( [CSAuto repo](https://github.com/MurkyYT/CSAuto) )

## Dependencies

- [jinja](https://jinja.palletsprojects.com) templates
- [markdown-it-py](https://github.com/executablebooks/markdown-it-py) for rendering FAQ and Changelog from main repo
- [picocss](https://picocss.com) css framework
- [Vercel](https://vercel.com) for deploy
- [httpx](https://www.python-httpx.org) as main HTTP client (mainly for GitHub)
- [loguru](https://github.com/Delgan/loguru) to log
- Also, [FastAPI](https://fastapi.tiangolo.com) and [Uvicorn](https://www.uvicorn.org) for live debugging

## Development

### Setting up environment

Requirements:

- Python 3.12
- [Poetry](https://python-poetry.org)

Firstly, you need to install dependencies (ofc, after cloning and going to dir) and activate shell

```bash
poetry install --no-root
poetry shell
```

## TO-DO

- [x] Parse GitHub references in Changelog
- [ ] Use live.py and serverless functions from Vercel
