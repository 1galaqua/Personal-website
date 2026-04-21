# Code Review

## `src/app/projects/[slug]/page.tsx`

### Findings

- **Low (`seo-patterns.mdc`)**: The sample project description in `src/content/projects.ts` is below the required 120 characters, so metadata description does not satisfy the documented minimum.

### What aligns with project rules

- **`react-patterns.mdc`**: Uses an explicit props interface (`Props`) and no `any`.
- **`content-patterns.mdc`**: Technologies are rendered as semantic `<ul>` / `<li>`; image uses required `alt`.
- **Semantic structure**: Page uses one `<h1>` and then content sections; heading order is valid.
- **Interactive state**: Back link includes both `hover` and `focus-visible` styles.
- **Mobile-first baseline**: Base classes target mobile first with simple `md:` expansion.
- **Visual consistency**: Tag pills now match `ProjectCard` styling in both light and dark mode.
- **SEO Open Graph**: `generateMetadata` includes `openGraph.title`, `openGraph.description`, and `openGraph.images` (`type: 'article'`).
- **No arbitrary image height**: Image wrapper uses `aspect-video` instead of `h-[400px]`.

---

## `src/app/page.tsx`

### Findings

- No blocking issues found.

### What aligns with project rules

- Projects are rendered with semantic `<ul>` / `<li>`.
- Grid follows mobile-first (`grid-cols-1`, then `md` / `lg`).
- `ProjectCard` consumes typed `Project` data.

---

## `src/app/layout.tsx`

### Note

- `lang="en"` and `dir="ltr"` are now consistent with the current English UI copy.
- `metadataBase` is set; update it when production domain changes.

---

## Summary

- Home page structure and list semantics align well with the rules.
- Main follow-up is content quality: extend project description text to meet the 120-character SEO minimum.
