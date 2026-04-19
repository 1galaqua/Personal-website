
export interface Project {
    title: string;
    description: string;
    slug: string;
    date: string;
    tags: string[];
    image: {
      src: string;
      alt: string; // mandatory for accessibility
    };
  }