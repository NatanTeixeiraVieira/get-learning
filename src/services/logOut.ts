import { signOut as nextSignOut } from 'next-auth/react';

import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from 'lib/firebaseWebConfig';

const logOut = async () => {
  try {
    await firebaseSignOut(auth);
    nextSignOut();
  } catch (error) {
    throw new Error('Falha ao sair.');
  }
};

export default logOut;
