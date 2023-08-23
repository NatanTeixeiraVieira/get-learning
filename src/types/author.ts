export type Author = {
  name: string;
  description?: string;
  userId: string;
  avatar?: {
    name: string;
    url: string;
  };
  slug: string;
  authorId: string;
};
