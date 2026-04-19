
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: "My Personal Portfolio",
    description: "A modern portfolio site built using the AIDD method with Next.js and Cursor.",
    slug: "personal-portfolio",
    date: "2024-03-20",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    image: {
      src: "/projects/portfolio.png",
      alt: "Screenshot of the portfolio homepage"
    }
  }
];