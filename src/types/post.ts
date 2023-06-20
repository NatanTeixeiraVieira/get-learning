export type Author = {
  name: string;
  description: string;
  id: string;
  avatar: {
    id: string;
    url: string;
  };
  slug: string;
};

export type Category = {
  name: string;
  slug: string;
};

export type Tag = {
  name: string;
  slug: string;
};

export type Post = {
  author: Author;
  coverImage: {
    id: string;
    url: string;
  };
  subtitle: string;
  allowComents: boolean;
  categories: Category[];
  title: string;
  slug: string;
  content: string;
  tags: Tag[];
  id: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
};
