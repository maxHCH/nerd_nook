# Nerd Nook 專案地圖（Nuxt 3）

> 盤點時間：2026-02-28（依目前 workspace 實際檔案）

## 1) 專案使用的 Nuxt 功能與模組（SSR / 路由 / API / 內容來源）

### 核心 Nuxt 能力

- **SSR + Nitro**：Nuxt 3 預設 SSR，且有 `server/api` 後端端點。
- **檔案式路由**：由 `app/pages` 自動產生 URL。
- **Layout 系統**：`app/layouts/default.vue`、`app/layouts/home.vue`，首頁透過 `definePageMeta({ layout: 'home' })` 指定。
- **Head 管理**：`app/app.vue` 以 `useHead` 設定全站標題，並掛載 `<VitePwaManifest />`。
- **內容系統（Nuxt Content）**：以 Markdown (`content/blog/*.md`) 當文章來源。

### 啟用中的 Nuxt Modules（`nuxt.config.ts`）

- `@vueuse/nuxt`
- `@unocss/nuxt`
- `@pinia/nuxt`
- `@nuxtjs/color-mode`
- `@vite-pwa/nuxt`
- `@nuxt/eslint`
- `@nuxt/content`

### 內容來源與 schema

- 來源：`content/blog/*.md`
- 定義：`content.config.ts` 的 `blog` collection
- 目前 schema 欄位：`title`、`description?`、`date`、`cover?`、`tag?`、`featured?`

---

## 2) 目前頁面路由清單（`pages/` 對應 URL）

對應目錄：`app/pages`

- `app/pages/index.vue` → `/`
- `app/pages/blog/[...slug].vue` → `/blog/:slug(.*)*`
- `app/pages/[...all].vue` → `/:all(.*)*`（catch-all / not found）

備註：目前 `app/pages` 下已無 `hi/[id].vue`。

---

## 3) server API 端點（`server/api`）

對應目錄：`server/api`

- `server/api/pageview.ts` → `GET /api/pageview`
  - 回傳 `{ pageview, startAt }`
  - `pageview` 為 process 記憶體遞增值（重啟歸零）

備註：目前前端頁面未看到對 `/api/pageview` 的呼叫。

---

## 4) 目前資料流與狀態管理方式（Pinia / composables）

### 內容資料流（已使用）

1. `content/blog/*.md` 由 `@nuxt/content` 建立 collection。
2. `app/components/PageView.vue` 用 `useAsyncData + queryCollection('blog').all()` 取得文章列表。
3. 在 `PageView.vue` 依 `featured` 分為精選與一般文章，再交給 `Card.vue` 呈現。
4. `Card.vue` 使用 `NuxtLink :to="post.path"` 導向文章頁。
5. `app/pages/blog/[...slug].vue` 用 `queryContent(`/blog/${params.slug}`).findOne()` 讀單篇並 `ContentRenderer` 渲染。

### 狀態管理現況

- **Pinia 模組已安裝，但目前 app 程式碼中未見 store 實際使用。**
- **`app/composables/` 目前為空**（沒有自訂 composable state）。
- 目前主要是「內容查詢驅動」：資料來自 Markdown/Content 查詢，非前端 store 中心化管理。

---

## 5) Blog 擴充建議（文章列表 / 詳細頁）

你目前已經有「首頁文章卡片 + 詳細頁」基礎，建議往以下結構整理：

### 建議新增檔案

- `app/pages/blog/index.vue`
  - 正式 blog 列表頁（與首頁分工）。
- `app/composables/useBlog.ts`
  - 集中 `listArticles`、`getArticleBySlug` 查詢邏輯。
- `app/types/blog.ts`（可選）
  - 對齊 `content.config.ts` schema，集中型別。

### 建議調整檔案

- `app/pages/blog/[...slug].vue`
  - 查無文章時回傳 404（`createError({ statusCode: 404 })`）。
  - 補上 `useSeoMeta`（title/description/og）。
- `app/components/PageView.vue`
  - 若首頁只顯示精選，可限制筆數（例如 only featured + 最近 N 篇）。

### 推薦做法

- **內容仍以 Nuxt Content 為主**：維持 markdown-first，開發成本最低。
- **查詢 API 風格統一**：建議統一採 `queryCollection` 或統一封裝在 `useBlog.ts`，避免頁面混用。
- **路由策略**：
  - 單層 slug：改 `app/pages/blog/[slug].vue`
  - 多層分類 slug：保留 `app/pages/blog/[...slug].vue`

### 若未來要後台/外部來源

- 可新增 `server/api/blog/*.ts` 當 BFF，對外統一介面。
- 若仍是純靜態內容，暫不需要 API 層，直接用 Nuxt Content 最簡潔。
