export type CoverImage = {
  id: string;
  name: string;
  url: string;
};

type Author = {
  id: string;
  name: string;
  slug: string;
  description: string;
  userImageId: string;
};

export type Post = {
  id: string;
  title: string;
  subtitle: string;
  postTime: string;
  coverImage: CoverImage;
  author: Author;
};

type PostsList = {
  postsList: Post[];
};

type LinksKey = 'first' | 'self' | 'next' | 'last';

type LinksValue = {
  href: string;
};

type Links = Record<LinksKey, LinksValue>;

type PageKeys = 'size' | 'totalElements' | 'totalPages' | 'number';

export type Page = Record<PageKeys, number>;

export type FindAllPosts = {
  _embedded: PostsList;
  _links: Links;
  page: Page;
};
