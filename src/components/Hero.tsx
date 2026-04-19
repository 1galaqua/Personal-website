export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-foreground md:text-6xl">
        Hi, I&apos;m Gal{" "}
        <span className="text-blue-600 dark:text-blue-400">
          Building Products with AI
        </span>
      </h1>
      <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-xl">
        A software engineer specializing in AI-First workflows and building
        scalable systems. This site was created to show how to do it right.
      </p>
    </section>
  );
}