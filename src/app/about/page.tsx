
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Gal Aqua',
  description: 'Gal Aqua, a Computer Science graduate, develops modern web applications and explores AI-driven workflows with a strong focus on architecture and quality.',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <section className="mb-12">
        <h1 className="mb-6 text-4xl font-extrabold text-foreground">About Me</h1>
        <p className="text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        I’m a developer and Computer Science graduate focused on building scalable 
        web applications and improving development workflows using AI tools, 
        with a strong emphasis on performance, clean architecture, and quality. [1].
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Core Principles</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0" aria-label="Professional focus areas">
          <li className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <strong>UI Architecture:</strong> Scalable infrastructure across multiple products [1].
          </li>
          <li className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <strong>Quality Standards:</strong> Performance and accessibility (a11y) as default [1].
          </li>
          <li className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <strong>AI-First Engineering:</strong> Scaling develop leverage with modern workflows [1].
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Now</h2>
        <p className="text-lg text-zinc-700 dark:text-zinc-300">
        Autommation Developer and Cursor-focused developer, building modern web applications and exploring AI-driven development workflows. 
        Focused on writing clean, efficient code while leveraging AI to improve productivity and development experience. [2].
        </p>
      </section>
    </main>
  );
}