# Markdownlint Audit

Audit date: **2026-08-25**

## Result

- Before configuration and structural corrections: **116 issues**.
- After corrections: **0 issues** with `markdownlint-cli2 v0.23.2` and `markdownlint v0.41.1`.

## Classification

### HTML required by the visual profile

The following elements are allowed explicitly by `.markdownlint.jsonc`:

- `picture` and `source`: dark/light and mobile hero sources.
- `img`: responsive hero, project cards, screenshots, engineering panel and local stack icons.
- `a`: stable section anchors, centered navigation and clickable project cards.
- `p` and `br`: alignment and controlled line break in the profile header/footer.
- `table`, `tr` and `td`: compact engineering-oriented stack layout with local SVG icons.
- `strong`: emphasis inside raw HTML containers where Markdown is not parsed consistently.
- `sub`: restrained audit footer treatment.

No other HTML element is allowed. `MD033` remains enabled.

### MD041 exception

`MD041` is disabled because the responsive `<picture>` hero is intentionally the first element of this GitHub Profile README. Adding a visible `#` heading above it would weaken the designed first impression; adding a duplicate heading below it would satisfy the rule mechanically without improving the document structure.

### Structural issues corrected

- Long prose was wrapped at semantic boundaries without changing rendered paragraphs.
- Long link groups were split across source lines while preserving their inline GitHub rendering.
- Long HTML elements were formatted with one attribute or child per line.
- The automatic repository generator now emits wrapped list items and compact descriptions, so scheduled updates remain lint-clean.
- Descriptive alt text was preserved for every image.

## Final command

```text
npx markdownlint-cli2 README.md
```

Final output: `Summary: 0 issues in 0 files`.

## GitHub rendering verification

The official GitHub Markdown API preserved the responsive `picture`/`source` hero, the mobile and dark/light sources, clickable SVG project cards, the stack table and all 12 stack icon references. GitHub adds its own safe wrapper/attributes during sanitization, as expected.
