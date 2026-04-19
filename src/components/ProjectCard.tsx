
import { Project } from '@/types/project';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
      {/* תמונה עם alt מחייב להנגשה */}
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={project.image.src}
          alt={project.image.alt} 
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* היררכיית כותרות לוגית */}
      <h3 className="mb-2 text-xl font-bold text-gray-900">
        <a href={`/projects/${project.slug}`} className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          {project.title}
        </a>
      </h3>

      <p className="mb-4 text-sm text-gray-600 line-clamp-2">
        {project.description}
      </p>

      {/* רשימת תגיות סמנטית */}
      <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technologies used in project">
 
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}