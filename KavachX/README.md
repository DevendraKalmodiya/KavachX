# KavachX — Static Preview

This repository primarily contains a Next.js application (see `app/` and `package.json`).
This `README` explains how to use the provided `index.html` as a standalone static site for quick previews.

## What I changed
- `index.html` — tuned for static use and links to `/css/styles.css` and `/js/main.js` (both live under `public/`).
- `public/css/styles.css` — small stylesheet for layout.
- `public/js/main.js` — tiny ES module demo script that updates the page on button click.

## Serve the static site locally (PowerShell)
You can serve the `public/` folder or the project root with any static server. Two quick options:

1) Using Node's `http-server` (install once):

```powershell
npm install -g http-server
# serve project root so index.html is used
http-server -c-1 .
```

2) Using Python (if installed):

```powershell
# serve project root on port 8000
python -m http.server 8000
```

Open http://localhost:8080 (http-server default) or http://localhost:8000 (python) in your browser.

## Notes
- Next.js development (`npm run dev`) will ignore `index.html`. This static index is only for simple previews or static hosting.
- If you want a full static export of the Next.js app, consider `next export` (see Next.js docs) and configure accordingly.
