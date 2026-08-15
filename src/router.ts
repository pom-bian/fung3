import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const pageModules = import.meta.glob('./pages/**/*.vue')
const notFoundPage = pageModules['./pages/[...path].vue']

function fileToPath(file: string) {
  const relativePath = file.replace('./pages', '').replace(/\.vue$/, '')
  const segments = relativePath.split('/').filter(Boolean)

  if (segments.at(-1) === 'index') segments.pop()

  return (
    '/' +
    segments
      .map((segment) => {
        if (segment.startsWith('[...') && segment.endsWith(']')) {
          return `:${segment.slice(4, -1)}(.*)*`
        }
        if (segment.startsWith('[') && segment.endsWith(']')) {
          return `:${segment.slice(1, -1)}`
        }
        return segment
      })
      .join('/')
  )
}

const routes: RouteRecordRaw[] = Object.entries(pageModules)
  .filter(([file]) => !file.includes('[...path].vue'))
  .map(([file, component]) => ({
    path: fileToPath(file),
    component,
  }))

if (notFoundPage) {
  routes.push({ path: '/:pathMatch(.*)*', component: notFoundPage })
}

export default createRouter({
  // Hash history keeps every generated route working on GitHub Pages without
  // requiring server-side rewrite rules (example: /#/docs/getting-started).
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
