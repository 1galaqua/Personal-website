
import { projects } from '@/content/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { SEO_DESCRIPTION_MAX_CHARS } from '@/constants/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

/** SSG-only segment: paths from `generateStaticParams`; unknown `slug` → 404. */
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const description = project.description.slice(0, SEO_DESCRIPTION_MAX_CHARS);

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: [{ url: project.image.src, alt: project.image.alt }],
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <Link 
        href="/" 
        className="mb-8 inline-flex items-center text-sm font-medium text-blue-700 transition-colors hover:text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-blue-300 dark:hover:text-blue-200"
      >
        ← Back to all projects
      </Link>

      <article className="max-w-4xl">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-extrabold text-foreground md:text-5xl">
            {project.title}
          </h1>
          <ul className="flex flex-wrap gap-2" aria-label="טכנולוגיות">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none text-zinc-700 dark:text-zinc-300">
          <p className="leading-relaxed">{project.description}</p>
        </div>
      </article>
    </main>
  );
}