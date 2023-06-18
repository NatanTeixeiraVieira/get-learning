import { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import Footer from 'components/Footer';
import Header from 'components/Header';

import { Providers } from './providers';

const openSans = Open_Sans({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'GetLearning',
    template: '%s | GetLearning',
  },
  description:
    'Adquira conhecimento sobre as mais diversas áreas lendo e compartilhando posts dentro do GetLearning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={openSans.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
