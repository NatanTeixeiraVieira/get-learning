type UserImageKeys = 'id' | 'name' | 'url';

type UserLoginKeys = 'id' | 'login' | 'userName' | 'userSlug';

export type UserLogin = Record<UserLoginKeys, string> & {
  avatar: Record<UserImageKeys, string>;
};

export type Login = {
  success: boolean;
  user: UserLogin;
  token: string;
};
