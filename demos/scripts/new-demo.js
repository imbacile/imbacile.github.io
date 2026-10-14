// Usage: npm run new <name>
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const name = process.argv[2]
if (!name || !/^[a-z0-9][a-z0-9-]*$/.test(name)) {
  console.error('Usage: npm run new <name>   (lowercase letters, digits, dashes)')
  process.exit(1)
}

const root = resolve(import.meta.dirname, '..')
const dest = resolve(root, name)
if (existsSync(dest)) {
  console.error(`"${name}" already exists`)
  process.exit(1)
}

cpSync(resolve(root, 'hello'), dest, { recursive: true })
const html = resolve(dest, 'index.html')
writeFileSync(html, readFileSync(html, 'utf8').replaceAll('Hello', name))
console.log(`Created ${name}/ — open http://localhost:5173/demos/${name}/ (restart dev server to list it on the index)`)
