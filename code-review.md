# Code Review

## Rules audit (`cursor/ruls` + `AGENTS.md`)

| Rule file | Status | Notes |
|-----------|--------|--------|
| **nextjs-standards.mdc** | **Met** | SSG on `[slug]`; **`next/image`** with **`fill`**, **`aspect-video`**, **`object-cover`**, responsive **`sizes`**, **`priority`** on detail hero + first home card. Matches rule: cover for even layout; no manual `width`/`height` in content. |
| **react-patterns.mdc** | **Met** | PascalCase; props interfaces; no `any`; semantic HTML; **`alt`** on images. |
| **seo-patterns.mdc** | **Partial** | Per-project OG (`title`, `description`, `images`); description clamped ≤160. **Gap**: **50–60 char** titles may still be short with `title.template` + brief `project.title`—optional `seoTitle` or richer `generateMetadata` `title`. |
| **styling-patterns.mdc** | **Met** | Mobile-first grid; card **focus-within** ring; back **Link** **focus-visible** styles. |
| **content-patterns.mdc** | **Met** | One **`h1`** on project pages; tags as **`<ul>/<li>`**; meaningful **`alt`**. |
| **AGENTS.md** | **N/A** | Use current Next docs under `node_modules/next/dist/docs/` for this major version. |

## Findings

- **Low (SEO)**: Optional alignment with **50–60** character titles if you treat `seo-patterns` strictly.

- **Low (`src/content/projects.ts`)**: **`date`** is still **`''`** on both projects—set real values if you surface dates in the UI, or remove the field from **`Project`** if it stays unused.

## What aligns with project rules

- **`src/app/projects/[slug]/page.tsx`**: **`generateStaticParams`**, **`dynamic`**, **`dynamicParams`**, typed **`params`**, **`generateMetadata`** + OG, **`main` / `article`**, hero **`next/image`** (**`fill`**, **`sizes`**, **`priority`**, **`object-cover`**, **`aspect-video`**).
- **`src/app/page.tsx`**: Semantic **`ul`/`li`** grid; first card **`priority`**.
- **`src/components/ProjectCard.tsx`**: **`Link`**; **`next/image`** (**`fill`**, **`sizes`**, **`object-cover`**, **`aspect-video`**); **focus-within** on card.
- **`src/content/projects.ts`**: Root-relative **`image.src`** (**`/projects/*.png`**, files under **`public/projects/`**); descriptions in SEO-friendly length band; **`image`** is **`src` + `alt` only** (no stored dimensions).
- **`src/app/layout.tsx`**: **`lang`**, **`dir`**, **`metadataBase`**, title template.
- **`src/constants/seo.ts`**: Shared description max for metadata.

## Open Questions

- Tighten **metadata titles** to 50–60 chars everywhere?

## Summary

- **SSG** and **image delivery** match **nextjs-standards**: static project routes, **`next/image`** optimization, **16∶9 frames** with **`object-cover`** (no letterboxing; possible edge crop).
- **React / styling / content** rules are satisfied; project screenshots live under **`public/projects/`** as **`/projects/*.png`** (clear vs the **`next/image`** import). Optional: **SEO title** polish only.
