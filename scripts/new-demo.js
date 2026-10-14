// Usage: npm run new <name>
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const name = process.argv[2]
if (!name || !/^[a-z0-9][a-z0-9-]*$/.test(name)) {
  console.error('Usage: npm run new <name>   (lowercase letters, digits, dashes)')
  process.exit(1)
}

const demos = resolve(import.meta.dirname, '..', 'demos')
const dest = resolve(demos, name)
if (existsSync(dest)) {
  console.error(`demos/${name} already exists`)
  process.exit(1)
}

cpSync(resolve(demos, 'hello'), dest, { recursive: true })
const html = resolve(dest, 'index.html')
writeFileSync(html, readFileSync(html, 'utf8').replaceAll('Hello', name))

// Add a link to the demos index page
const index = resolve(demos, 'index.html')
writeFileSync(
  index,
  readFileSync(index, 'utf8').replace(
    '      </ul>',
    `        <li><a href="./${name}/">${name}</a></li>\n      </ul>`,
  ),
)
console.log(`Created demos/${name}/ → http://localhost:5173/demos/${name}/`)
