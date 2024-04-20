type Image = {
  id: string;
  name: string;
  url: string;
};

export type Author = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: Image;
};
