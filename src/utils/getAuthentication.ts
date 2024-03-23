import { tokenKey, userKey } from 'constants/cookiesKeys';
import { parseCookies } from 'nookies';
import { UserLogin } from 'types/login';

export const getAuthentication = () => {
  const token: string | undefined = parseCookies()[tokenKey];
  const userJson = parseCookies()[userKey];
  const user = userJson ? (JSON.parse(userJson) as UserLogin) : null;

  return {
    token,
    user,
  };
};
