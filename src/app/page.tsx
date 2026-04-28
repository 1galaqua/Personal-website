import Image from 'next/image';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/content/projects';
import type { Project } from '@/types/project';

export default function Home() {

  const secondaryContactClass =
    'inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-base font-medium text-zinc-950 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5';

  return (
    <main>
      <section
        className="border-b border-zinc-200 bg-[var(--background)] dark:border-zinc-800"
        aria-labelledby="contact-heading"
      >
        <div className="container mx-auto flex flex-col items-center px-4 pb-8 pt-10">
          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full ring-4 ring-zinc-200 shadow-lg dark:ring-zinc-700">
            <Image
              src="/projects/portfolio.png"
              alt="Gal Aqua"
              fill
              sizes="160px"
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <h2 id="contact-heading" className="sr-only">
              Contact
            </h2>
            <a
              href="mailto:gaqua61@gmail.com"
              className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-base font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Email me
            </a>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <a
                href="https://github.com/1galaqua"
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryContactClass}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/gal-aqua-431447223/"
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryContactClass}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STEP-002: Hero Section */}
      <Hero />
      
      {/* STEP-003: Content Layer - Projects Grid */}
      <section
        className="container mx-auto px-4 py-16"
        aria-labelledby="projects-title"
      >
        <h2
          id="projects-title"
          className="mb-10 text-3xl font-bold text-foreground md:text-4xl"
        >
          Featured Projects
        </h2>
        
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: Project, index: number) => (
            <li key={project.slug}>
              <ProjectCard project={project} priority={index === 0} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}