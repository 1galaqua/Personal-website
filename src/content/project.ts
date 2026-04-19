
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: "הפורטפוליו האישי שלי",
    description: "אתר פורטפוליו מודרני שנבנה בשיטת AIDD עם Next.js ו-Cursor.",
    slug: "personal-portfolio",
    date: "2024-03-20",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    image: {
      src: "/projects/portfolio.png",
      alt: "צילום מסך של דף הבית של הפורטפוליו" 
    }
  }
];