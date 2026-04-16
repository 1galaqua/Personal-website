import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <p className="text-sm font-medium tracking-wide text-zinc-700 dark:text-zinc-300">
              Portfolio
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 md:text-6xl">
              I build fast, accessible web experiences.
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-zinc-700 dark:text-zinc-300 md:text-xl">
              I’m a developer focused on clean UI, strong UX, and reliable
              systems. Explore my work and reach out if you’d like to
              collaborate.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#projects"
              className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-base font-medium text-zinc-50 transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-zinc-50 dark:focus-visible:ring-offset-black sm:w-auto"
            >
              View projects
            </Link>
            <Link
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-zinc-300 bg-transparent px-6 py-3 text-base font-medium text-zinc-950 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900 dark:focus-visible:ring-zinc-50 dark:focus-visible:ring-offset-black sm:w-auto"
            >
              Contact
            </Link>
          </div>

          <dl className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 md:grid-cols-3">
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Focus
              </dt>
              <dd className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                UI engineering
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Values
              </dt>
              <dd className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                Accessibility first
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Stack
              </dt>
              <dd className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                Next.js • Tailwind • TypeScript
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
