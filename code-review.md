# Code Review: `src/app/page.tsx`

## Findings

- **Low**: `ProjectCard` links to `/projects/${slug}`. There is still no `src/app/projects/[slug]/page.tsx` (or equivalent), so those URLs likely **404** until project detail routes are added.

## What aligns with project rules

- **STEP-002 / STEP-003**: Home composes **`Hero`** and the projects block from **`@/content/projects`**.
- **`content-patterns.mdc`**: The projects list uses **`<ul>`** / **`<li>`**; `ProjectCard` renders tags as **`<ul>`** / **`<li>`** with **`aria-label`** on the tag list.
- **`styling-patterns.mdc`**: The projects grid is **mobile-first** (`grid-cols-1`, then `md:grid-cols-2`, `lg:grid-cols-3`) and uses the spacing scale (`gap-8`, `mb-10`, `px-4`, `py-16`) without arbitrary bracket values on this file.
- **Accessibility**: The projects region uses **`aria-labelledby="projects-title"`** with an **`h2`** whose **`id`** matches.
- **`react-patterns.mdc`**: `ProjectCard` uses **`ProjectCardProps`** with **`project: Project`** (`src/types/project.ts`).

## Heading hierarchy

- **`Hero`** renders a single **`h1`**; **`page.tsx`** uses **`h2`** for “פרויקטים נבחרים”. Order is correct (no skipped levels).

## Summary

- **`page.tsx`** matches the intended list layout, responsive grid, and wiring to shared content. The main follow-up is **project detail pages** if `/projects/[slug]` should resolve.
- **Residual gap**: No automated checks for duplicate slugs, missing images, or broken links; regressions can slip in without CI or build-time validation.
