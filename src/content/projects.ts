
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'personal-portfolio',
    title: 'Personal Portfolio',
    description: 'Professional portfolio built with Next.js and AIDD, emphasizing accessible UI, dynamic SEO metadata, and fast static generation for reliable project pages.',
    date: '28/4/2026',
    tags: ['Next.js', 'Tailwind CSS', 'AIDD', 'TypeScript'],
    image: {
      src: '/projects/portfolio.png',
      alt: 'Screenshot of the personal portfolio website',
    }
  },
  {
    slug: 'ai-chatbot',
    title: 'AI Chatbot Widget',
    description: 'Interactive AI chatbot widget with custom prompts, designed for real-time engagement and automated knowledge retrieval to strengthen developer brand presence.',
    date: '28/4/2026',
    tags: ['AI', 'OpenAI', 'React', 'Next.js'],
    image: {
      src: '/projects/chatbot.png',
      alt: 'AI Chatbot widget interface',
    }
  }
];