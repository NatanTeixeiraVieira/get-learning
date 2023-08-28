export type Category = {
  name: string;
  slug: string;
};

export type Tag = {
  name: string;
  slug: string;
};

export type CoverImage = {
  name: string;
  url: string;
};

export type Post = {
  authorId: string;
  coverImage: CoverImage;
  excerpt: string;
  allowComents: boolean;
  category: Category;
  title: string;
  content: string;
  tags: Tag[] | [];
  postId: string;
  createdAt: number;
};
