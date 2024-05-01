type Image = Record<'id' | 'name' | 'url', string>;

export type UpdateAuthorInfo = {
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
