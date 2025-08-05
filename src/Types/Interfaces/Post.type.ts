import type { Author } from "./Author.type";

interface Post {
  id: number;
  title: string;
  body: string;
  comments_count: number;
  created_at: string;
  image: string | undefined;
  author: Author;
  tags: Tag[];
}

interface Tag {
  name: string;
}

export type { Post, Tag };
