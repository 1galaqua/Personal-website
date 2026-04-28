
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Gal Aqua',
  description: 'Gal Aqua, a Computer Science graduate, develops modern web applications and explores AI-driven workflows with a strong focus on architecture and quality.',
};

const experienceTimeline = [
  {
    range: '02/2025 – present',
    role: 'Automation Developer',
    org: 'Citadel Cyber Security',
  },
  {
    range: '03/2023 – 09/2024',
    role: 'DLP',
    org: 'Citadel Cyber Security',
  },
  {
    range: '10/2020 – 10/2024',
    role: 'Student',
    org: 'Ariel University',
  },
] as const;

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <section className="mb-12">
        <h1 className="mb-6 text-4xl font-extrabold text-foreground">About Me</h1>
        <p className="text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        I’m a developer and Computer Science graduate focused on building scalable 
        web applications and improving development workflows using AI tools, 
        with a strong emphasis on performance, clean architecture, and quality.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Core Principles</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0" aria-label="Professional focus areas">
          <li className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <strong>UI Architecture:</strong> Scalable infrastructure across multiple products.
          </li>
          <li className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <strong>Quality Standards:</strong> Performance and accessibility (a11y) as default.
          </li>
          <li className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <strong>AI-First Engineering:</strong> Scaling develop leverage with modern workflows.
          </li>
        </ul>
      </section>

      <section aria-labelledby="now-heading">
        <h2 id="now-heading" className="mb-4 text-2xl font-bold text-foreground">
          Now
        </h2>
        <div className="max-w-prose rounded-xl border border-zinc-100 bg-zinc-50/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/50">
          <p className="text-[1.05rem] leading-relaxed text-zinc-700 dark:text-zinc-300">
            Automation developer and Cursor-focused engineer, building modern web applications and exploring AI-driven development workflows.
          </p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-zinc-700 dark:text-zinc-300">
            Focused on clean, efficient code and using AI to boost productivity and developer experience.
          </p>
        </div>

        <div className="mt-12" aria-labelledby="experience-heading">
          <h3 id="experience-heading" className="mb-4 text-xl font-bold text-foreground">
            Experience
          </h3>
          <div className="max-w-prose rounded-xl border border-zinc-100 bg-zinc-50/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/50">
            <ol className="relative ml-2 list-none border-l-2 border-blue-400/70 py-1 pl-0 dark:border-blue-900/90">
              {experienceTimeline.map((item) => (
                <li
                  key={`${item.range}-${item.role}`}
                  className="relative pb-8 pl-8 last:pb-0"
                >
                  <span
                    className="absolute -left-[9px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-zinc-50 bg-blue-600 ring-2 ring-zinc-50/80 dark:border-zinc-950 dark:bg-blue-400 dark:ring-zinc-950/80"
                    aria-hidden
                  />
                  <time className="block text-sm font-semibold tracking-wide text-blue-800 dark:text-blue-300">
                    {item.range}
                  </time>
                  <p className="mt-1 text-[1.05rem] font-semibold leading-snug text-foreground">
                    {item.role}
                  </p>
                  <p className="mt-0.5 text-[1.05rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.org}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}