'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { emailIdKey, tokenKey, userKey } from 'constants/cookiesKeys';
import {
  emailConfirmationExpiresTimeInSeconds,
  loginExpiresTimeInMilliseconds,
} from 'constants/times';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { registerConfirmEmail } from 'services/auth';

export default function ConfirmRegister() {
  const router = useRouter();
  const params = useSearchParams();

  (async () => {
    const token = params.get('token');
    const emailId = parseCookies()[emailIdKey];

    const response = await registerConfirmEmail(token, emailId);

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
      router.push('/');
    }
  })();

  return;
}
