import { signIn } from 'next-auth/react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'lib/firebaseConfig';

export const registerWithCredentials = async (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginWithCredentials(email, password);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        return new Error('Email já está em uso.');
      }
      return new Error('Falha ao cadastrar usuário.');
    });
};

export const loginWithCredentials = async (email: string, password: string) => {
  return await signIn<'credentials'>('credentials', {
    email,
    password,
    redirect: false,
  });
};
