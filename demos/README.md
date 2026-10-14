# Demos

Small in-browser UI prototypes, published at <https://imbacile.github.io/demos/>.

Plain HTML/CSS/JS — no build step. What you see locally is exactly what gets published.

## Work locally

```sh
npm install      # once, from the repo root
npm run dev      # opens http://localhost:5173/demos/ — the page reloads on every save
```

## New demo

```sh
npm run new my-idea   # creates demos/my-idea/ and adds it to the index page
```

Each demo is a folder with `index.html`, `main.js` and `style.css`. Shared styles live in `shared/`.

## Publish

When you're happy with it, commit and push to `main`. GitHub Pages updates the site within a minute or so.
