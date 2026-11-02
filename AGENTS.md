# 專案規則（JCB情報站 Astro 部落格）

## 文章視覺排版與配圖 SOP（每次撰寫或修改文章都必須遵守）

撰寫 Markdown 文章時，必須同時擔任「視覺編輯」，自動為文章配圖，並**直接把圖片下載到專案**（不使用外部圖片網址）：

1. **首圖（Hero Image）**：Frontmatter 結束後、正文的第一行，必定放一張。
2. **情境配圖**：在至少 2 個最重要的 H2（`##`）標題下方（例如實測對比、使用情境段落）各放一張。

### 自動找圖與下載

- 依文章內容上網搜尋高質感、可免費商用的無版權圖片，優先 Unsplash / Pexels；若無法直接下載，改用 Wikimedia Commons 中授權為 CC0 或公有領域（Public Domain）的圖片（需確認授權欄位，不使用 CC BY / CC BY-SA 等需標示作者的圖片）。
- 圖片下載到 `src/assets/images/`（若資料夾不存在就建立），建議寬度約 1200px。
- 下載後必須實際檢視圖片，確認內容與主題相符。
- 在專案根目錄的 `IMAGE_CREDITS.md` 補上檔名、使用位置、授權與來源連結。

### SEO 檔名優化

- 檔名一律使用與文章相關的「英文＋連字號」小寫命名，例如 `kose-setting-spray-hero.jpg`。
- 不使用中文、空格或無意義的檔名（如 `image1.jpg`）。
- 不用不實的品牌名稱命名（圖片中沒有該品牌就不要放進檔名）。

### 相對路徑引用（讓 Astro 建置時自動壓縮並轉為 WebP）

文章位於 `src/content/blog/`，必須使用相對路徑：

```
![具備 SEO 關鍵字的中文圖片描述](../../assets/images/圖片檔名.jpg)
```

- 不可改放 `public/` 或外部網址，否則 Astro 不會做圖片最佳化。
- alt 文字要誠實描述圖片內容，若是象徵性圖片需寫明「示意」。

### 圖片選擇原則

- 避開容易出現特定人物肖像、商標、品牌包裝的圖片；圖片須與主題相符，且授權可商用。
- 隱形眼鏡、美妝類文章不使用帶醫療誇大意味的圖片（如眼睛病變、充血、過度誇張的特寫）。

### 防呆機制

- [rehype-image-placeholder.mjs](src/plugins/rehype-image-placeholder.mjs) 仍保留：若文章中殘留「請搜尋圖庫：」佔位符，建置時會隱藏並在終端機印出「提醒：文章 X 還有未替換的圖片佔位符」。
## 其他固定規範

- 文章 Frontmatter 欄位：`title`、`description`、`pubDate`、`category`（可選 `image`、`draft`）。
- 聯盟連結需照使用者提供的原文貼上，不可改動網址或文字；外部連結會由插件自動加上 `rel="sponsored nofollow noopener"`。
- 禁用空話開場與結尾：「總而言之」、「讓我們深入探討」、「作為一個AI」。
- Git commit 訊息請以 UTF-8 檔案（`git commit -F`）寫入，避免 PowerShell 中文亂碼。

