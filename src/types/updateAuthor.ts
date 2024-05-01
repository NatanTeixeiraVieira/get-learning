type Image = Record<'id' | 'name' | 'url', string>;

export type UpdateAuthor = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: Image | null;
  _links: {
    self: {
      href: string;
    };
  };
};
