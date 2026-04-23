# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm dev:pwa      # Start dev server with PWA enabled
pnpm build        # Build for production (SSR, Nitro)
pnpm generate     # Static site generation
pnpm start        # Run production SSR server
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check (vue-tsc)
```

No test suite is configured.

## Architecture

**Nerd Nook** is a personal blog built on **Nuxt 3** (compatibility version 4) with SSR via Nitro. Package manager is `pnpm`; Node 20–22 is required.

### Content system

Posts are Markdown files in `content/posts/*.md`, managed by `@nuxt/content` v3. The collection schema is defined in `content.config.ts`:

```
title (required), date (required), description?, cover?, tag?, featured?
```

Post images go in `public/images/posts/<slug>/`, using absolute paths in Markdown (e.g. `/images/posts/my-post/cover.jpg`). Cover image: `cover.jpg`; body images: `img-01.jpg`, `img-02.jpg`, etc.

Frontmatter keys must not be renamed without explicit intent — `queryCollection('posts')` queries depend on them.

### Routing

File-based routing from `app/pages/`:

- `/` → `index.vue` (homepage, client-only via `<ClientOnly>` + `<Suspense>`, shows posts from past month as "recent", older posts in a grid via `<Card>`)
- `/posts` → `posts/index.vue` (full post list split into `featured` and all others, sorted by date desc)
- `/posts/[slug]` → `posts/[slug].vue` (single post rendered with `<ContentRenderer>`)
- `/about` → `about.vue`
- `[...all].vue` → catch-all / 404

### Layout & styling

`app/layouts/default.vue` wraps every page with `<Header>`, `<main>`, and `<Footer>`.

Styling is **UnoCSS** (atomic CSS + `presetWebFonts` with DM Sans / DM Serif Display / DM Mono). CSS custom properties define the design tokens:

| Token          | Purpose               |
| -------------- | --------------------- |
| `--jp-bg`      | Page background       |
| `--jp-surface` | Card/elevated surface |
| `--jp-text`    | Primary text          |
| `--jp-muted`   | Secondary/meta text   |
| `--jp-border`  | Borders and dividers  |

Reusable UnoCSS shortcuts (defined in `uno.config.ts`): `page`, `container`, `container-wide`, `card`, `card-box`, `navlink`, `meta`, `prose-jp`, `title-xl`, `title-lg`, `title-md`. **Prefer shortcuts over stacking raw atomic classes in templates.**

Dark mode is handled by `@nuxtjs/color-mode` with `classSuffix: ''` (adds `dark` class to `<html>`).

### Server API

`server/api/pageview.ts` → `GET /api/pageview` — returns an in-memory page view counter (`{ pageview, startAt }`). Resets on server restart; not currently called by the frontend.

### State management

Pinia is installed but not actively used. No composables exist yet. Data flow is query-driven: `useAsyncData` + `queryCollection('posts')` directly in page components.

## Working rules

### General

- Prefer Nuxt built-in capabilities and official recommendations over custom solutions.
- Do not modify `package.json` or add dependencies without explaining why.
- Do not introduce new frameworks.
- Do not reorganize folder structure without explicit instruction.
- If a change touches more than 5 files, state the strategy before making any edits.
- If requirements are ambiguous, list your assumptions before implementing.

### Tasks

- Handle one small task at a time (completable within 30–60 minutes).
- Do not bundle multiple features into one change.
- Provide minimal diffs — no surrounding cleanup unless requested.

### Each response must include

1. Files to add/modify
2. Full code or a clear diff for each file, with the purpose of each change explained
3. Verification steps: `pnpm dev`, `pnpm build`, and a description of expected output

### Error handling

- On build or dev errors: provide only the minimal fix, explain the root cause, and distinguish whether it is a code, config, or dependency problem.
- Do not rewrite architecture to fix an error.

### Code style

- Use TypeScript. Clear, semantic naming — avoid vague identifiers.
- Avoid over-abstraction. Extract to a composable only when the logic is genuinely reused across multiple places.
- Keep components small and focused.

### Content system

- Articles are Markdown-first; do not create a backend CMS.
- Frontmatter fields must stay consistent. Do not rename existing frontmatter keys unless the task explicitly requires it — `queryCollection('posts')` queries depend on them.
- No external CDN or image hosting in the initial phase. If CDN is needed later, maintain current path conventions to make migration straightforward.

### UI & visual style

- Extract repeated UI patterns into reusable components.
- Use UnoCSS shortcuts as the primary styling mechanism — avoid stacking large numbers of raw atomic classes in templates.
- Keep spacing, border, and typography rules consistent across similar sections.
- Prioritize readability and layout stability.
- Do not add complex animations for minor features.
- Visual style: Japanese minimalism — generous whitespace, grayscale palette, thin borders, low shadow, content-first.
