# Nerd Nook

A personal blog built with Nuxt 3, focused on clean reading experience and Markdown-first content.

## Tech Stack

- [Nuxt 3](https://nuxt.com/) — SSR via Nitro, file-based routing, compatibility version 4
- [Nuxt Content v3](https://content.nuxt.com/) — Markdown posts with frontmatter schema
- [UnoCSS](https://github.com/unocss/unocss) — Atomic CSS with custom shortcuts and web fonts
- [Nuxt Studio](https://nuxt.studio) — Visual content editor
- [VueUse](https://vueuse.org/) — Composition utilities
- [Pinia](https://pinia.vuejs.org/) — State management
- [Color Mode](https://color-mode.nuxtjs.org/) — Dark / light mode
- [PWA](https://vite-pwa-org.netlify.app/) — Offline support and installable app

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm dev:pwa      # Start dev server with PWA enabled
pnpm build        # Build for production (SSR, Nitro)
pnpm generate     # Static site generation
pnpm start        # Run production SSR server
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check
```

## Content

Posts live in `content/posts/*.md`. Required frontmatter:

```yaml
---
title: Post Title
date: 2026-01-01
description: Short description
cover: /images/posts/my-post/cover.jpg
tag: [life, dev]
featured: true
---
```

Post images go in `public/images/posts/<slug>/`.

## Project Structure

```
app/
├── components/     # Header, Footer, Card, DarkToggle...
├── config/         # PWA config
├── constants/      # App name, description
├── layouts/        # default.vue
└── pages/          # index, posts/[slug], about, 404
content/
└── posts/          # Markdown articles
public/             # Static assets, icons, images
server/
└── api/            # pageview.ts
```

## Requirements

- Node.js 20–22
- pnpm 9+
