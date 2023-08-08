'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Laptop, Moon, Sun, UserCircle2 } from 'lucide-react';
import getAuthorLoggedInfos from 'services/getAuthorLoggedInfos';
import logOut from 'services/logOut';
import { Author } from 'types/author';

import {
  AccountIcon,
  AccountMenu,
  NavigationItems,
  ThemeIcon,
  Exit,
  Overlay,
  ToggleThemeArea,
  Container,
} from './styles';

export default function UserAccount() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [authorLoggedInfos, setAuthorLoggedInfos] = useState<Author | null>(
    null
  );

  const { data } = useSession();

  const handleLogout = async () => {
    await logOut();
  };

  useEffect(() => {
    const userLoggedInfos = async () => {
      const authorLogged = await getAuthorLoggedInfos(data?.user?.email);
      setAuthorLoggedInfos(authorLogged.datas);
    };

    userLoggedInfos();
  }, [data?.user?.email]);

  return (
    <Container>
      <AccountIcon
        onClick={() => {
          setShowAccountMenu((prev) => !prev);
        }}
      >
        <UserCircle2 size="2.5rem" strokeWidth={2} />
      </AccountIcon>

      {showAccountMenu && (
        <>
          <AccountMenu>
            <nav>
              <ul>
                <NavigationItems>
                  <Link
                    href={`${authorLoggedInfos?.slug}/${authorLoggedInfos?.authorId}`}
                  >
                    <Image
                      src={
                        authorLoggedInfos?.avatar?.url ?? '/assets/profile.png'
                      }
                      alt="Avatar do proprietário do usuário logado"
                      width={24}
                      height={24}
                    ></Image>
                    {authorLoggedInfos?.name}
                  </Link>
                </NavigationItems>
                <NavigationItems>
                  <Link href="/makePost">Publicar post</Link>
                </NavigationItems>
                <NavigationItems>
                  <Link href="/">Configurações da conta</Link>
                </NavigationItems>
                <ToggleThemeArea>
                  <ThemeIcon>
                    <Moon />
                  </ThemeIcon>
                  <ThemeIcon>
                    <Laptop />
                  </ThemeIcon>
                  <ThemeIcon>
                    <Sun />
                  </ThemeIcon>
                </ToggleThemeArea>
                <Exit onClick={handleLogout}>Sair</Exit>
              </ul>
            </nav>
          </AccountMenu>
          <Overlay onClick={() => setShowAccountMenu(false)} />
        </>
      )}
    </Container>
  );
}
