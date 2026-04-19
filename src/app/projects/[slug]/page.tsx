import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { SEO_DESCRIPTION_MAX_CHARS } from "@/constants/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function clipDescription(text: string): string {
  if (text.length <= SEO_DESCRIPTION_MAX_CHARS) return text;
  return text.slice(0, SEO_DESCRIPTION_MAX_CHARS).trimEnd();
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const description = clipDescription(project.description);

  return {
    // Root layout uses `title.template: "%s | Gal's Portfolio"` — avoid duplicating the suffix here.
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: [{ url: project.image.src, alt: project.image.alt }],
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-16 md:py-20">
      <article>
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-medium text-zinc-700 underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-zinc-300"
        >
          ← Back to home
        </Link>

        <h1 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl">
          {project.title}
        </h1>

        <div className="relative mb-8 aspect-video w-full max-w-3xl overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 48rem) 100vw, 48rem"
            priority
          />
        </div>

        <p className="max-w-3xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-xl">
          {project.description}
        </p>

        <h2 className="mt-10 text-lg font-semibold text-foreground">
          Technologies
        </h2>
        <ul
          className="mt-3 flex flex-wrap gap-2"
          aria-label="Technologies used in this project"
        >
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}
