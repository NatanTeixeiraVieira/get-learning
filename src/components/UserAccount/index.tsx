'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { useRouteChange } from 'hooks/useRouteChange';
import { Laptop, Moon, Sun, UserCircle2, X } from 'lucide-react';
import getAuthorLoggedInfos from 'services/getAuthorLoggedInfos';
import logOut from 'services/logOut';
import useThemeStore from 'store/theme';
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
  XIcon,
} from './styles';

import AvatarProfile from 'components/AvatarProfile';

export default function UserAccount() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [authorLoggedInfos, setAuthorLoggedInfos] = useState<Author | null>(
    null
  );

  const { data } = useSession();

  const handleCloseMenu = useCallback(() => {
    setShowAccountMenu(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await logOut();
  }, []);

  useRouteChange(handleCloseMenu);

  const { toggleTheme } = useThemeStore().actions;

  useEffect(() => {
    const userLoggedInfos = async () => {
      const authorLogged = await getAuthorLoggedInfos(data?.user?.email);
      setAuthorLoggedInfos(authorLogged.datas);
    };

    userLoggedInfos();
  }, [data?.user?.email]);

  const isMobile = window.innerWidth < 760;

  return (
    <Container>
      <AccountIcon
        onClick={() => {
          setShowAccountMenu((prev) => !prev);
        }}
      >
        {authorLoggedInfos?.avatar && (
          <AvatarProfile
            src={authorLoggedInfos?.avatar?.url}
            alt="Avatar do proprietário do usuário logado"
            fill
          />
        )}
        {!authorLoggedInfos?.avatar && (
          <UserCircle2 size="2.5rem" strokeWidth={2} color="white" />
        )}
      </AccountIcon>

      <>
        <AccountMenu showAccountMenu={showAccountMenu}>
          {isMobile && (
            <XIcon onClick={handleCloseMenu}>
              <X />
            </XIcon>
          )}
          <nav>
            <ul>
              <NavigationItems>
                <Link
                  href={`${authorLoggedInfos?.slug}/${authorLoggedInfos?.authorId}`}
                >
                  <AvatarProfile
                    src={authorLoggedInfos?.avatar?.url}
                    alt="Avatar do proprietário do usuário logado"
                    width={24}
                    height={24}
                  />
                  {authorLoggedInfos?.name}
                </Link>
              </NavigationItems>
              <NavigationItems>
                <Link href="/makePost">Publicar post</Link>
              </NavigationItems>
              <NavigationItems>
                <Link href="/account">Configurações da conta</Link>
              </NavigationItems>
              <ToggleThemeArea>
                <ThemeIcon onClick={() => toggleTheme('dark')}>
                  <Moon />
                </ThemeIcon>
                <ThemeIcon onClick={() => toggleTheme('system')}>
                  <Laptop />
                </ThemeIcon>
                <ThemeIcon onClick={() => toggleTheme('light')}>
                  <Sun />
                </ThemeIcon>
              </ToggleThemeArea>
              <Exit onClick={handleLogout}>Sair</Exit>
            </ul>
          </nav>
        </AccountMenu>
        {showAccountMenu && (
          <Overlay onClick={() => setShowAccountMenu(false)} />
        )}
      </>
    </Container>
  );
}
