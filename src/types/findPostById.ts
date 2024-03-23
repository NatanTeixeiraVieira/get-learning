type AuthorImageKeys = 'id' | 'name' | 'url';

type AuthorImage = Record<AuthorImageKeys, string>;

type Author = {
  id: string;
  name: string;
  slug: string;
  description: string;
  authorImage: AuthorImage | null;
};

type CoverImageKeys = 'id' | 'name' | 'url';

type CoverImage = Record<CoverImageKeys, string>;

type CategoryTagKeys = 'id' | 'name' | 'slug';

export type Category = Record<CategoryTagKeys, string>;

type Tag = Record<CategoryTagKeys, string>;

type Links = {
  postList: {
    href: string;
  };
};

export type FindPostById = {
  id: string;
  allowComments: boolean;
  content: string;
  title: string;
  subtitle: string;
  postTime: string;
  author: Author;
  coverImage: CoverImage;
  categories: Category[];
  tags: Tag[];
  _links: Links;
};
