import { defineConfig } from 'vite'
import { readdirSync, existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = import.meta.dirname

// Every folder containing an index.html is a demo.
function findDemos() {
  return readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !['node_modules', 'dist', 'shared', 'scripts', 'public'].includes(d.name))
    .filter((d) => existsSync(resolve(root, d.name, 'index.html')))
    .map((d) => {
      const html = readFileSync(resolve(root, d.name, 'index.html'), 'utf8')
      const title = html.match(/<title>(.*?)<\/title>/s)?.[1].trim() || d.name
      return { name: d.name, title }
    })
}

export default defineConfig(() => {
  const demos = findDemos()
  return {
    // Published at https://kulturvolk.cc/demos/
    base: '/demos/',
    define: { __DEMOS__: JSON.stringify(demos) },
    build: {
      rollupOptions: {
        input: {
          main: resolve(root, 'index.html'),
          ...Object.fromEntries(demos.map((d) => [d.name, resolve(root, d.name, 'index.html')])),
        },
      },
    },
  }
})
