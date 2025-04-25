# cs-auto-web

Source code of [CSAuto website](https://csauto.vercel.app). ( [CSAuto repo](https://github.com/MurkyYT/CSAuto) )

## Dependencies

- [jinja](https://jinja.palletsprojects.com) templates
- [markdown-it-py](https://github.com/executablebooks/markdown-it-py) for rendering FAQ and Changelog from main repo
- [picocss](https://picocss.com) as css framework
- [clipboard.js](https://github.com/zenorocha/clipboard.js) for easily copying
- [Vercel](https://vercel.com) for deploy
- [httpx](https://www.python-httpx.org) as main HTTP client (mainly for GitHub)
- [loguru](https://github.com/Delgan/loguru) to log
- Also, [FastAPI](https://fastapi.tiangolo.com) and [Uvicorn](https://www.uvicorn.org) for live debugging
- [python-dotenv](https://github.com/theskumar/python-dotenv) for reading .env files
- [Babel](https://babel.pocoo.org) for help with localizing

### Deserves mention

- [Font Awesome](https://fontawesome.com/) svg icons

## Development

### Software recommendations

- [Visual Studio Code](https://code.visualstudio.com) or [VSCodium](https://vscodium.com)

### Setting up environment

Requirements:

- Python 3.12
- [Poetry](https://python-poetry.org)

Firstly, you need to install dependencies (ofc, after cloning and going to dir) and activate shell

```bash
poetry install --with dev --no-root
poetry shell
```

### Environment variables

- `LOGURU_LEVEL`
  - Used by loguru. For more loguru envvars see [this](https://github.com/Delgan/loguru/blob/master/loguru/_defaults.py)
  - Default: `DEBUG`
  - Value: `TRACE`, `DEBUG`, `INFO`
- `CSAUTO_BASE_URL`
  - Needed for canonical urls, Open Graph and etc.
  - Default: `https://csauto.vercel.app/`
  - Value: https url to website. If web does not have simple domain (`example.github.io/cs-auto`), you must put trailing slash to the end of it (like `https://example.github.io/cs-auto/`)
- `CSAUTO_GH_REPO`
  - Used by GH reference parser
  - Default: `MurkyYT/CSAuto`
- `CSAUTO_DEFAULT_BRANCH`
  - Used for accessing files on main repo like `FullChangelog.MD` or `README.md`
  - Default: `master`

#### Variables below are used for debugging purpose

- `CSAUTO_DISABLE_META`
  - Disables all meta tags to escape any misunderstandings with search indexers
  - Default: *False*
  - Value: Boolean (`True`/`False` or `1`/`0`)
- `CSAUTO_LIVE_PROVIDER`
  - `README.md` and `FullChangelog.md` provider. If you decide to switch this to `local`, you must specify where they are through `CSAUTO_CHANGELOG`, `CSAUTO_README_EN` and `CSAUTO_README_RU`
  - Default: `github`
  - Value: `github` or `local`
- `CSAUTO_LOAD_GH_CACHE`
  - Toggles GitHub data cache saving into `gh_cache.json`
  - Default: *False*
  - Value: Boolean (`True`/`False` or `1`/`0`)

### Translating

> Translate [CSAuto](https://github.com/MurkyYT/CSAuto) first

- Language codes with territories are undesirable
  - ~~ru_MD~~ ➡ ru
  - ~~en_CA~~ ➡ en
- Use `<br>` to go to new line
- If you see closing tag in original, you must write same closing tag in translation

- Extract strings
  - `pybabel -v extract -F .\babel.cfg -o ".\languages\messages.pot" --project "csauto-web" --sort-by-file .`
- Init new language
  - `pybabel init -d .\languages\ -i .\languages\messages.pot -l {LOCALE}`
- How to update
  - `pybabel update -d .\languages\ -i .\languages\messages.pot -l {LOCALE}`
- Compile .po to .mo
  - `pybabel compile -d .\languages\`

Steps to manually add new language:

- Extract strings
- Init new language
- Edit lines in [`shared.py`](https://github.com/MurkyYT/cs-auto/blob/master/scripts/shared.py)

## TO-DO

- [X] Add support for translations
  - [ ] Add WebLate support
