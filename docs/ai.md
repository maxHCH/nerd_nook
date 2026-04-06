# AI 工作規範（Nuxt3 Blog / Nerd Nook）

## 基本環境

- 專案：Nuxt 3（SSR 模式）
- Node: 20.x
- Package manager: pnpm（使用 lockfile）
- 不允許隨意修改 package.json 或新增 dependency（除非明確說明原因）
- 不引入新框架（例如 Quasar）

## 技術原則

- 優先使用 Nuxt 內建能力與官方推薦做法
- 優先使用現有專案結構，不隨意重構資料夾
- 不進行大規模重構，除非任務明確要求
- 若修改多於 5 個檔案，必須先說明修改策略
- 優先使用 TypeScript
- 避免過度抽象，保持可讀性優先
- 命名需語意清楚，避免模糊命名

## 內容系統規範

- 文章以 Markdown 管理
- 不建立後台 CMS
- 優先採用檔案式內容管理
- 文章 frontmatter 欄位需保持一致
- 不得任意變更既有 frontmatter key 名稱，除非任務明確要求

### 建議 frontmatter 欄位

- title
- description
- date
- tags
- cover
- published

## 圖片管理規範

- 文章圖片優先放在 `public/images/posts/<slug>/`
- Markdown 圖片使用絕對路徑，例如：
  `/images/posts/my-post/cover.jpg`
- 每篇文章使用自己的 slug 作為圖片資料夾名稱
- 封面圖命名優先使用 `cover.jpg`
- 內文圖片使用 `img-01.jpg`, `img-02.jpg` 這類規則
- 不在初期引入外部 CDN 或圖床
- 若未來需要 CDN，需先保持目前路徑規則一致，方便遷移

## 任務執行規範

- 每次只執行一個小任務（30~60 分鐘內可完成）
- 不一次處理多個功能
- 優先提供 minimal diff
- 若需求不明確，先列出合理假設再實作

## 輸出必須包含

1. 需要新增/修改的檔案清單
2. 每個檔案的具體修改（完整程式碼或清楚 diff）
3. 驗證方式：
   - `pnpm dev`
   - `pnpm build`
   - 預期畫面/結果說明

## 回覆格式（必須遵守）

### 1. 任務說明

- 本次要完成的單一小任務
- 是否涉及超過 5 個檔案

### 2. 檔案清單

- 新增哪些檔案
- 修改哪些檔案

### 3. 修改內容

- 提供完整程式碼或清楚 diff
- 說明每個修改的目的

### 4. 驗證方式

- `pnpm dev`
- `pnpm build`
- 預期畫面與結果

### 5. 風險與備註

- 是否有已知限制
- 是否有後續可拆分任務

## 錯誤修復流程

若 build 或 dev 發生錯誤：

- 只提供最小修改方案（minimal diff）
- 不進行架構重寫
- 說明錯誤原因
- 若是環境問題，需先區分是程式碼問題、設定問題、還是依賴問題

## 開發風格

- 使用 TypeScript
- 清楚命名
- 避免過度抽象
- 保持可讀性優先
- component 不要過大
- composable 只抽離可重用邏輯，不為了抽而抽

## UI 實作規範

- 優先抽成可重用的 UI 元件
- 樣式以 shortcuts 為主，不在頁面堆大量原子 class
- 同類型區塊需統一 spacing / border / typography 規則
- 優先保證閱讀性與版面穩定性
- 不為了小功能新增複雜動畫

## 視覺風格

- 日系極簡：留白多、灰階、細邊框、低陰影、乾淨閱讀
- 內容優先，不過度裝飾
- 手機版體驗優先考量
