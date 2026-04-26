
import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-white dark:border-zinc-700 dark:bg-zinc-900 dark:focus-within:ring-offset-zinc-900">
      {/* Image with required alt for accessibility */}
      <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Semantic heading hierarchy */}
      <h3 className="mb-2 text-xl font-bold text-foreground">
        <Link
          href={`/projects/${project.slug}`}
          className="focus:outline-none"
        >
          <span className="absolute inset-0" aria-hidden="true" />
          {project.title}
        </Link>
      </h3>

      <p className="mb-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 line-clamp-2">
        {project.description}
      </p>

      {/* Semantic tag list */}
      <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technologies used in project">
 
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}