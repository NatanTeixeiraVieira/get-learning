type UserImageKeys = 'id' | 'name' | 'url';

type UserLoginKeys =
  | 'id'
  | 'authorId'
  | 'login'
  | 'userName'
  | 'userSlug'
  | 'authorImageUrl'
  | 'description';

export type UserLogin = Omit<
  Record<UserLoginKeys, string>,
  'authorImageUrl'
> & {
  authorImage: Record<UserImageKeys, string>;
};

export type Login = {
  success: boolean;
  user: UserLogin;
  token: string;
};
