# Code Review

## Rules audit (`cursor/ruls` + `AGENTS.md`)

| Rule file | Status | Notes |
|-----------|--------|--------|
| **nextjs-standards.mdc** | **Met** | SSG on `[slug]`; **`next/image`** (**`fill`**, **`aspect-video`**, **`object-cover`**, **`sizes`**, **`priority`**). |
| **react-patterns.mdc** | **Met** | PascalCase; typed props; no `any`; semantic HTML; **`alt`** on images. |
| **seo-patterns.mdc** | **Partial** | Per-project OG; description clamped ≤160. Optional: **50–60 char** titles via richer `generateMetadata` / `seoTitle`. |
| **styling-patterns.mdc** | **Met** | Mobile-first; focus / hover on interactive elements. |
| **content-patterns.mdc** | **Met** | Heading hierarchy; lists; meaningful **`alt`**. |
| **security.mdc** | **Met** | **`OPENAI_API_KEY`** read via **`process.env`** in **`src/app/api/chat/route.ts`** only (server); no keys in source. Use **`.env.local`** + Vercel env (see **`.env.example`**). |
| **AGENTS.md** | **N/A** | Follow current Next docs under `node_modules/next/dist/docs/`. |

## Findings

- **Low (SEO)**: Optional **50–60** character share titles (`seo-patterns.mdc`).

- **Low (`src/content/projects.ts`)**: **`date`** still **`''`**—populate or remove from **`Project`** if unused.

- **Medium (`src/app/api/chat/route.ts`)**: **`messages`** from the client is passed straight to OpenAI—**no schema validation**, length cap, or rate limit. For production, validate **`role` / `content`**, cap message count and string length, and consider **rate limiting** / auth if abuse matters.

## What aligns with project rules

- **`src/app/projects/[slug]/page.tsx`**: SSG flags, **`generateStaticParams`**, **`generateMetadata`**, OG, semantic layout, **`next/image`**.
- **`src/app/page.tsx`**: Semantic grid; first card **`priority`**.
- **`src/components/ProjectCard.tsx`**: **`Link`**, **`next/image`**, focus-within.
- **`src/content/projects.ts`**: **`/projects/*.png`** under **`public/projects/`**; SEO-length descriptions.
- **`src/app/layout.tsx`**: Root metadata, **`lang`**, **`dir`**, global **`ChatWidget`**.
- **`src/app/api/chat/route.ts`**: Route handler **`POST`**, OpenAI **`gpt-4o`**, server-only key, structured system prompt for portfolio Q&A.
- **`src/components/ChatWidget.tsx`**: Client UI, **`fetch('/api/chat')`** with JSON body, loading state, message list.
- **`src/constants/seo.ts`**: Shared description cap.

## Open Questions

- Tighten **metadata titles** to 50–60 chars everywhere?
- Add **validation / limits** on **`/api/chat`** before wider launch?

## Summary

- **Portfolio**: SSG, images, and content rules remain in good shape; **`public/projects/`** URLs are clear.
- **Chat**: Key stays server-side (**`security.mdc`**). Harden the **API** (payload limits, validation) for untrusted traffic.
- **Optional**: SEO titles, **`date`** field, abuse protections on chat.
