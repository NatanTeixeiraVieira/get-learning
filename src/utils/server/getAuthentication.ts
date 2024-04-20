import { cookies } from 'next/headers';

import { tokenKey, userKey } from 'constants/cookiesKeys';
import { UserLogin } from 'types/login';

export const getServerAuthentication = () => {
  const token: string | undefined = cookies().get(tokenKey)?.value;
  const userJson = cookies().get(userKey)?.value;
  const user = userJson ? (JSON.parse(userJson) as UserLogin) : null;

  return {
    token,
    user,
  };
};
