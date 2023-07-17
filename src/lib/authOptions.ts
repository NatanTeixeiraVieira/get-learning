import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'lib/firebaseConfig';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        if (credentials?.email && credentials.password) {
          return await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          )
            .then((userCredential) => {
              if (userCredential.user) {
                return userCredential.user;
              }
              return null;
            })
            .catch((error) => {
              switch (error.code) {
                case 'auth/wrong-password':
                  throw new Error('Senha incorreta');
                case 'auth/user-not-found':
                  throw new Error('Usuário não encontrado');
                case 'auth/too-many-requests':
                  throw new Error(
                    'Muitas tentativas. Por favor, tente novamente mais tarde'
                  );
                default:
                  throw new Error('Falha ao entrar');
              }
            });
        }
        throw new Error('Dados de login inválidos');
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === 'development',
};
