import { signIn } from 'next-auth/react';

const loginWithCredentials = async (email: string, password: string) => {
  return await signIn<'credentials'>('credentials', {
    email,
    password,
    redirect: false,
  });
};

export default loginWithCredentials;
