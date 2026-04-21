# 傷寒論淺注補正-卷三複習

這是一個以 `bestseller` 模板改出的 Quarto book 草稿。目標是把《傷寒論淺註補正》紙本卷三的教學脈絡，整理成初學者可反覆查閱、教師可持續增補的複習書。

## 目前狀態

- 已建立 Quarto HTML book 設定，適合後續發布 GitHub Pages。
- 保留 Typst/PDF 相關模板檔，後續可另開 PDF 流程製作 A5 講義版。
- 已完成完整九章草稿：
  - `index.qmd`：前言與全書九章規劃
  - `01.qmd`：第一章 當治療改變疾病
  - `02.qmd`：第二章 第一批安全分叉
  - `03.qmd`：第三章 結胸系統
  - `04.qmd`：第四章 像結胸但不是結胸
  - `05.qmd`：第五章 少陽樞機與微結
  - `06.qmd`：第六章 痞證的入口
  - `07.qmd`：第七章 水、火、陽虛與痞硬
  - `08.qmd`：第八章 胃中不和與反覆誤下
  - `09.qmd`：第九章 旋覆代赭湯作為出口
  - `source-text.qmd`：原文參照，收錄 `p001-p224` 可點閱段落
  - `source-notes.qmd`：原文來源與引用規則
- 已套用芫荽體網頁字型，並保留本機字型 fallback。
- 章節中的「原文閱讀」來源已可點閱，右側欄位會列出本頁使用的原文段落。

## 原文來源

主要來源位於上一層資料庫：

```text
../sections/010_taiyang_3.md
../wiki/010_taiyang_3_pre_xuanfu_daizhe_context.md
```

本書的原文範圍：

```text
010_taiyang_3.md paragraph 001-224
```

## 渲染

HTML book：

```bash
quarto render
```

PDF/Typst 版保留模板檔，建議後續獨立成單檔流程後再啟用：

```bash
quarto render book.qmd --to typst
```

## 章節規劃

章節主清單在：

```text
chapters.yml
```

若後續擴寫新章：

1. 新增 `03.qmd`、`04.qmd` 等章節檔。
2. 在 `_quarto.yml` 的 `book.chapters` 加入該檔案。
3. 確認 `chapters.yml` 的章名與章節 H1 完全一致。

## 發布到 GitHub Pages

後續建議把本目錄獨立成 repo 或移到 repo 根目錄，使用 Quarto 官方 GitHub Pages workflow。輸出目錄為 `_book`。
