# Vue Namecheck

A small Vue 3 site that checks `.com` availability using Verisign's public RDAP service.

## Local development

```bash
npm install
npm run dev
```

## File-based routes

Pages are generated from the `src/pages` folder:

- `src/pages/index.vue` → `/#/`
- `src/pages/about.vue` → `/#/about`
- `src/pages/docs/index.vue` → `/#/docs`
- `src/pages/users/[id].vue` → `/#/users/:id`

Hash-based URLs are intentional: they allow every route to load correctly from GitHub Pages without server rewrite rules.

## Project structure

```text
src/
├── pages/                 # URL-mapped Vue pages
│   ├── index.vue          # /#/ 
│   └── [...path].vue      # 404 fallback
├── lib/                   # Reusable framework-independent TypeScript
│   ├── checker/
│   │   └── domain.ts      # RDAP domain checking
│   ├── types/
│   │   └── checker.ts     # Shared TypeScript types
│   └── index.ts           # Public exports
├── App.vue                # Landing-page UI
├── router.ts              # File-to-URL route mapping
└── main.ts                # Vue entry point
```

Keep API calls, validation, data transforms, and shared types in `src/lib/**/*.ts`. Keep visual page components in `src/pages/**/*.vue`.

## Deploying

Every push to `main` builds and deploys the site through GitHub Actions. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** once.
