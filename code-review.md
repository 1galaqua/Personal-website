# Code Review

## `src/app/page.tsx`

### Findings

- None blocking: home lists projects and links to `/projects/[slug]`; the detail route is implemented and pre-rendered (see below).

### What aligns with project rules

- **`content-patterns.mdc`**: Projects use **`<ul>`** / **`<li>`**; `ProjectCard` uses semantic tag lists with **`aria-label`**.
- **`styling-patterns.mdc`**: Mobile-first grid on the home projects section; spacing uses the Tailwind scale (no arbitrary pixel classes on this file).
- **`react-patterns.mdc`**: `ProjectCard` uses **`ProjectCardProps`** with **`project: Project`**.

### Heading hierarchy

- **`Hero`** provides the document **`h1`** on the home page; the projects block uses **`h2`** (“Featured Projects”).

### Layout note

- **`layout.tsx`** sets **`lang="he"`** and **`dir="rtl"`** while some UI strings are English—acceptable for a bilingual site; ensure typography and spacing still look correct in RTL.

---

## `src/app/projects/[slug]/page.tsx`

### Findings

- **Low (`seo-patterns.mdc`)**: **Meta description** should stay **between 120–160 characters**. The code caps length at **`SEO_DESCRIPTION_MAX_CHARS`** (**160**). If **`description`** in **`@/content/projects`** is **shorter than 120 characters**, extend the copy in the content file (or add a vetted metadata-only suffix) to satisfy the minimum. *Current sample:* the **`personal-portfolio`** entry’s English **`description`** is **under 120 characters**, so it does not yet meet the minimum without copy changes.
- **Low (deployment)**: **`layout.tsx`** defines **`metadataBase`** for production URLs. After you change domains, update that URL (or derive it from **`process.env.NEXT_PUBLIC_SITE_URL`**) so **OG** URLs always match the live site. If the build logs a **`metadataBase`** warning, confirm the root layout’s **`metadata`** export is loaded for all routes.

### Resolved / improved in code (was previously noted)

- **Title vs `h1`**: **`generateMetadata`** now returns **`title: project.title`** only. The root **`metadata.title.template`** (**`%s | Gal's Portfolio`**) produces the document title, and the visible **`h1`** matches the **`%s`** part—aligned with **`seo-patterns.mdc`** intent.
- **Static generation**: **`generateStaticParams`** pre-renders known project slugs at build time (**SSG**).
- **Open Graph**: **`openGraph.description`** uses the same **clipped** string as **`metadata.description`** for consistency.

### What aligns with project rules

- **`react-patterns.mdc`**: **`ProjectPageProps`** with **`params: Promise<{ slug: string }>`**; **`import type { Metadata }`**; no **`any`**.
- **`seo-patterns.mdc`**: **`generateMetadata`** supplies **`title`** (segment), **`description`**, and **`openGraph`** (**`title`**, **`description`**, **`images`** with **`url`** and **`alt`**).
- **`content-patterns.mdc`**: **Tags** as **`<ul>`** / **`<li>`** with **`aria-label`**; **`next/image`** with **`project.image.alt`**.
- **`styling-patterns.mdc`**: Mobile-first typography; theme-aware body text; **back** **`Link`** with **`hover`** and **`focus-visible`** ring styles.
- **Landmarks**: **`main`** → **`article`**; **`h2`** (“Technologies”) follows **`h1`** (no skipped levels).

### Constants

- **`src/constants/seo.ts`**: **`SEO_DESCRIPTION_MAX_CHARS`** (and **`MIN`** for future checks) centralize the description cap.

---

## Summary

- **Home** and **project detail** follow semantic structure, list rules, and accessible media.
- **Project detail** uses the **root title template**, **SSG** via **`generateStaticParams`**, and clipped **meta/OG** descriptions.
- Remaining follow-ups: **editorial** description length (**≥ 120** characters in content) and keeping **`metadataBase`** in sync with the **production** domain.
