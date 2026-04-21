
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'personal-portfolio',
    title: 'Personal Portfolio',
    description: 'Professional portfolio built with Next.js and AIDD. Features high accessibility (a11y), dynamic SEO metadata, and fast SSG performance for every project page.',
    date: '', // <-- Missing in original, must be added
    tags: ['Next.js', 'Tailwind CSS', 'AIDD', 'TypeScript'],
    image: {
      src: '/projects/portfolio.png',
      alt: 'Screenshot of the personal portfolio website'
    }
  },
  {
    slug: 'ai-chatbot',
    title: 'AI Chatbot Widget',
    description: 'Interactive AI Chatbot with custom prompts. Designed for real-time engagement and automated knowledge retrieval to enhance developer branding and interaction.',
    date: '', // <-- Missing in original, must be added
    tags: ['AI', 'OpenAI', 'React', 'Next.js'],
    image: {
      src: '/projects/chatbot.png',
      alt: 'AI Chatbot widget interface'
    }
  }
];