'use client';

import { useRouter } from 'next/navigation';

import {
  tokenEmailConfirmationKey,
  emailIdKey,
  tokenKey,
  userKey,
} from 'constants/cookiesKeys';
import {
  emailConfirmationExpiresTimeInSeconds,
  loginExpiresTimeInMilliseconds,
} from 'constants/times';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { registerConfirmEmail } from 'services/auth';

export default function ConfirmRegister() {
  const router = useRouter();

  (async () => {
    const tokenEmailConfirmation = parseCookies()[tokenEmailConfirmationKey];
    const emailId = parseCookies()[emailIdKey];

    const response = await registerConfirmEmail(
      emailId,
      tokenEmailConfirmation
    );

    if (response.success && emailId) {
      setCookie(null, tokenKey, response.data.token, {
        maxAge: loginExpiresTimeInMilliseconds,
        path: '/',
      });
      setCookie(null, userKey, JSON.stringify(response.data.user), {
        maxAge: loginExpiresTimeInMilliseconds,
        path: '/',
      });
      destroyCookie(null, emailIdKey, {
        maxAge: emailConfirmationExpiresTimeInSeconds,
        path: '/',
      });
      destroyCookie(null, tokenEmailConfirmationKey, {
        maxAge: emailConfirmationExpiresTimeInSeconds,
        path: '/',
      });
      router.push('/');
    }
  })();

  return;
}
