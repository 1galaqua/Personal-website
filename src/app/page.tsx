import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/content/projects';

export default function Home() {
  return (
    <main>
      {/* STEP-002: Hero Section */}
      <Hero />
      
      {/* STEP-003: Content Layer - Projects Grid */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="projects-title">
        <h2 id="projects-title" className="mb-10 text-3xl font-bold text-gray-900 md:text-4xl">
          פרויקטים נבחרים
        </h2>
        
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}