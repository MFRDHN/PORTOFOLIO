export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  desc: string;
  cover: string;
  images: string[];
  technologies: string[];
  repoUrl: string;
  liveUrl: string;
  featured: boolean;
  createdAt?: string | null;
}

export interface Certificate {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  color: string;
  gradient: string;
  date: string;
  credentialUrl: string;
}
