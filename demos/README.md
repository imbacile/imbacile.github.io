# Demos

Small in-browser UI prototypes, published at <https://kulturvolk.cc/demos/>.

Built with [Vite](https://vite.dev). Every folder here that contains an `index.html`
is a demo, served at `/demos/<folder>/`. `shared/` holds common styles/code.

## Local development

```sh
cd demos
npm install
npm run dev          # http://localhost:5173/demos/ with hot reload
```

## New demo

```sh
npm run new my-idea  # copies hello/ to my-idea/
```

Restart the dev server to make it show up on the index page (the page itself works right away).
The `<title>` of a demo's `index.html` is used as its name on the index.

## Production build

```sh
npm run build        # outputs to dist/
npm run preview      # serves the build at http://localhost:4173/demos/
```

## Publishing

Pushing to `main` runs `.github/workflows/pages.yml`, which builds the demos and deploys
the whole site (root files + `demos/dist` as `/demos`) to GitHub Pages.
