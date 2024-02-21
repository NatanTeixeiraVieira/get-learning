'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'lib/firebaseWebConfig';
import { saveUserDatas } from 'services/registerWithCredentials';

type SaveAuthorProps = {
  searchParams: {
    name: string;
  };
};

export default function ConfirmRegister({ searchParams }: SaveAuthorProps) {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const userName = localStorage.getItem('userName');

      console.log(user);
      console.log(status);
      if (
        user?.emailVerified &&
        user?.email &&
        userName &&
        auth.currentUser?.uid &&
        status === 'unauthenticated'
      ) {
        const responseSaveDatas = saveUserDatas(
          user.uid,
          userName,
          user.email

          // if (responseSaveDatas.ok) {
          //   const loginResponse = await loginWithCredentials(user.email);
          //   if (loginResponse?.ok) {
          //     console.log(loginResponse);
          //     router.push('/');
          //     return;
          //   }
          // }
        );
      }
    });
  }, [router, status]);
  return;
}
