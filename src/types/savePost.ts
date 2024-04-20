type TagCategory = {
  id: string;
  name: string;
  slug: string;
};

export type SavePost = {
  id: string;
  allowComments: boolean;
  content: string;
  title: string;
  subtitle: string;
  authorId: string;
  coverImageId: string;
  postTime: string;
  categories: TagCategory[];
  tags: TagCategory[];
};
