'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';

import { tokenKey, userKey } from 'constants/cookiesKeys';
import { loginExpiresTimeInMilliseconds } from 'constants/times';
import { useRouteChange } from 'hooks/useRouteChange';
import { Laptop, Moon, Sun, UserCircle2, X } from 'lucide-react';
import { destroyCookie } from 'nookies';
import { getClientAuthentication } from 'utils/getAuthentication';

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
  const { user } = getClientAuthentication();

  const handleCloseMenu = useCallback(() => {
    setShowAccountMenu(false);
  }, []);

  const handleLogout = useCallback(async () => {
    destroyCookie(null, tokenKey, {
      maxAge: loginExpiresTimeInMilliseconds,
      path: '/',
    });
    destroyCookie(null, userKey, {
      maxAge: loginExpiresTimeInMilliseconds,
      path: '/',
    });
  }, []);

  useRouteChange(handleCloseMenu);

  const isMobile = window.innerWidth < 760;

  return (
    <Container>
      <AccountIcon
        onClick={() => {
          setShowAccountMenu((prev) => !prev);
        }}
      >
        {user?.avatar && (
          <AvatarProfile
            src={user?.avatar?.url}
            alt="Avatar do proprietário do usuário logado"
            fill
          />
        )}
        {!user?.avatar && (
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
                <Link href={`${user?.userSlug}/${user?.authorId}`}>
                  <AvatarProfile
                    src={user?.avatar?.url}
                    alt="Avatar do proprietário do usuário logado"
                    width={24}
                    height={24}
                  />
                  {user?.userName}
                </Link>
              </NavigationItems>
              <NavigationItems>
                <Link href="/makePost">Publicar post</Link>
              </NavigationItems>
              <NavigationItems>
                <Link href="/account">Configurações da conta</Link>
              </NavigationItems>
              <ToggleThemeArea>
                <ThemeIcon onClick={() => ''}>
                  <Moon />
                </ThemeIcon>
                <ThemeIcon onClick={() => ''}>
                  <Laptop />
                </ThemeIcon>
                <ThemeIcon onClick={() => ''}>
                  <Sun />
                </ThemeIcon>
              </ToggleThemeArea>
              <Link href="/login">
                <Exit onClick={handleLogout}>Sair</Exit>
              </Link>
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
