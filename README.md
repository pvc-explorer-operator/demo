# PVC Explorer Demo

Self-contained demo build of the PVC Explorer UI, deployed to GitHub Pages.

Built output goes to `dist/`. The GitHub Actions workflow builds and deploys it.

## Build locally

```bash
npm install
npm run build
```

The built files land in `dist/`. GitHub Pages is configured to serve from the `dist/` folder (via GitHub Actions deployment).

## Updating

When the main project's UI changes, sync the source files and rebuild:

```bash
# From this repo root:
rsync -a --exclude=node_modules --exclude=dist --exclude=.git ../pvc-explorer/ui/ .
npm install
npm run build
```

Or just push to `main` and the GitHub Actions workflow handles everything.
