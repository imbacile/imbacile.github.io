// Strict hierarchy: Home > Section A–C > Page 1–6 > Subpage 1–6.
// Each page lives at a hash URL, e.g. #/b/2/3 = Section B > Page 2 > Subpage 3.

const SECTIONS = ['a', 'b', 'c']
const COUNT = 6

const levels = [
  { name: () => 'Home' },
  { name: (s) => `Section ${s.toUpperCase()}`, children: SECTIONS },
  { name: (n) => `Page ${n}`, children: range(COUNT) },
  { name: (n) => `Subpage ${n}`, children: range(COUNT) },
]

function range(n) {
  return Array.from({ length: n }, (_, i) => String(i + 1))
}

// "#/b/2/3" → ['b', '2', '3']; anything invalid falls back to the deepest valid ancestor.
function parsePath() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  const path = []
  for (const part of parts) {
    const level = levels[path.length + 1]
    if (!level || !level.children.includes(part)) break
    path.push(part)
  }
  return path
}

const href = (path) => (path.length ? `#/${path.join('/')}` : '#/')
const label = (path) => levels[path.length].name(path.at(-1))

function render() {
  const path = parsePath()
  const address = document.getElementById('address')
  const children = document.getElementById('children')
  address.replaceChildren()
  children.replaceChildren()

  // Address: every ancestor is a link, the current page is plain text.
  for (let depth = 0; depth <= path.length; depth++) {
    const crumbPath = path.slice(0, depth)
    if (depth > 0) {
      const sep = document.createElement('span')
      sep.className = 'sep'
      sep.textContent = '>'
      address.append(sep)
    }
    if (depth === path.length) {
      const current = document.createElement('span')
      current.setAttribute('aria-current', 'page')
      current.textContent = label(crumbPath)
      address.append(current)
    } else {
      const a = document.createElement('a')
      a.href = href(crumbPath)
      a.textContent = label(crumbPath)
      address.append(a)
    }
  }

  // Links down to the child pages, if any.
  const next = levels[path.length + 1]
  for (const child of next?.children ?? []) {
    const a = document.createElement('a')
    a.href = href([...path, child])
    a.textContent = next.name(child)
    const li = document.createElement('li')
    li.append(a)
    children.append(li)
  }

  document.title = `${label(path)} · AntsNav`
}

addEventListener('hashchange', render)
render()
