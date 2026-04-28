# Code Review

## Rules audit (`cursor/ruls` + `AGENTS.md`)

| Rule file | Status | Notes |
|-----------|--------|--------|
| **nextjs-standards.mdc** | **Met** | SSG on `[slug]`; **`next/image`** (**`fill`**, **`aspect-video`**, **`object-cover`**, **`sizes`**, **`priority`**). |
| **react-patterns.mdc** | **Met** | PascalCase; typed props; no `any`; semantic HTML (**`nav`**, **`main`**, **`dialog`** where used); **`alt`** on images. |
| **seo-patterns.mdc** | **Partial** | Per-project OG; description clamped ≤160. Optional: **50–60 char** titles via richer `generateMetadata` / `seoTitle`. |
| **styling-patterns.mdc** | **Met** | Mobile-first; **focus-visible** / hover on links, buttons, chat controls; **`dark:`** on chat panel and nav. |
| **content-patterns.mdc** | **Met** | Heading hierarchy; lists; meaningful **`alt`**. |
| **security.mdc** | **Met** | **`OPENAI_API_KEY`** via **`process.env`** on server in **`api/chat/route.ts`**; no keys in client bundle. Configure **`.env.local`** (local) and **Vercel → Environment Variables** (Production + Preview), then **Redeploy**. |
| **AGENTS.md** | **N/A** | Follow current Next docs under `node_modules/next/dist/docs/`. |

## Findings

- **Low (SEO)**: Optional **50–60** character share titles (`seo-patterns.mdc`).

- **Low (`content`)**: **`Project.date`** is modeled and set in **`projects.ts`** but **not rendered** yet in **`ProjectCard`** / **`projects/[slug]`**. Optional: show date for context or omit from **`Project`** until needed.

- **~~Medium (`src/app/api/chat/route.ts`)~~**: **Partially addressed** — **`messages`** validated (shape, roles **`user`/`assistant`**, ≤**50** items, per-message and total character caps); missing **`OPENAI_API_KEY`** → **503**; **`APIError`** branches for **429** / **401** / **503**; invalid JSON → **400**. Ongoing: true **rate limiting** (e.g. per-IP at the edge) still optional for high traffic.

## What aligns with project rules

- **`src/app/layout.tsx`**: Root metadata, **`lang`**, **`dir`**, global **`SiteNav`** + **`ChatWidget`**.
- **`src/components/SiteNav.tsx`**: Sticky header; **`next/link`**; **Home** / **About** grouped with brand **Gal Aqua**; **`usePathname`** + **`aria-current`**; focus rings.
- **`src/app/projects/[slug]/page.tsx`**: SSG flags, **`generateStaticParams`**, **`generateMetadata`**, OG, semantic layout, **`next/image`**.
- **`src/app/page.tsx`**: Semantic grid; first card **`priority`**.
- **`src/components/ProjectCard.tsx`**: **`Link`**, **`next/image`**, focus-within.
- **`src/content/projects.ts`**: **`/projects/*.png`** under **`public/projects/`**; SEO-length descriptions; **`date`** strings per project.
- **`src/app/api/chat/route.ts`**: **`POST`**, **`gpt-4o`**, payload validation (≤**50** messages; length caps); system prompt (portfolio / AIDD); **`APIError`** mapping; normalized JSON **`{ role, content }`** on success.
- **`src/components/ChatWidget.tsx`**: Circular **`/projects/chatbot.png`** launcher; **`fetch`** + history; **Send** + Enter; **`aria-live`**, **`dialog`**, Esc to close; **dark-mode** bubbles and input.
- **`src/constants/seo.ts`**: Shared description cap.

## Open Questions

- Tighten **metadata titles** to 50–60 chars everywhere?
- Add **edge / per-IP rate limiting** on **`/api/chat`** when traffic grows?

## Summary

- **Portfolio**: SSG, images, nav, and content patterns are in good shape; **`public/projects/`** URLs stay clear.
- **UX**: Global **SiteNav** + floating **chat** with accessible patterns.
- **Chat / ops**: Keys stay on the server; **`/api/chat`** now validates payloads and returns clearer status-specific errors; optional next step is **edge rate limiting** under load.
