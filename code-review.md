# Code Review

## Findings

- **Medium (`src/content/projects.ts`)**: `ai-chatbot` references `/projects/chatbot.png`, but this asset is missing under `public/projects` (while `/projects/portfolio.png` exists). Result: broken image in cards, detail page, and `og:image` for that project.

## What aligns with project rules

- **`src/app/projects/[slug]/page.tsx`**:
  - Uses typed props with async `params` handling, no `any`.
  - `generateMetadata` includes `title`, `description`, and Open Graph fields (`title`, `description`, `images`, `type`).
  - Semantic structure is valid (`main`, `article`, single `h1`, tags as `<ul>/<li>`).
  - Back link includes explicit hover/focus-visible states.
  - Image container uses `aspect-video` (no arbitrary height magic number).
- **`src/app/page.tsx`**:
  - Projects list is semantic (`<ul>/<li>`), mobile-first grid.
  - `ProjectCard` receives typed `Project` data.
- **`src/components/ProjectCard.tsx`**:
  - Card layout and tag styling are consistent across light/dark mode.
  - `alt` is sourced from content model.
- **`src/app/about/page.tsx`**:
  - Uses theme-safe text and surface classes with dark-mode variants for readable contrast.
- **`src/content/projects.ts`**:
  - Project descriptions are now written within the SEO-friendly 120–160 character range.
- **`src/app/layout.tsx`**:
  - `lang="en"` and `dir="ltr"` are aligned with current UI copy.
  - Global `metadataBase`/title template are configured.

## Open Questions

- Should all project images be committed under `public/projects`, or do you want to support remote URLs as well?
- Do you want to keep the current About copy tone, or align it more closely with the Home/Hero voice?

## Summary

- Core routing, metadata, semantic markup, and responsive structure are in good shape.
- Highest-priority fix is adding `public/projects/chatbot.png` (or updating the path) to remove broken visuals and OG image failure for `ai-chatbot`.
