'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';

import { useRouteChange } from 'hooks/useRouteChange';

import {
  HeaderContainer,
  HeaderContent,
  LoginAndRegister,
  OutOfMenu,
} from './styles';

import HeaderLink from 'components/HeaderLink';
import MenuBurger from 'components/MenuBurger';
// import UserAccount from 'components/UserAccount';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  useRouteChange(handleCloseMenu);

  return (
    <HeaderContainer>
      <MenuBurger onClick={handleShowMenu} showMenu={showMenu} />
      {/* {status === 'authenticated' && <UserAccount />} */}
      {/* {status === 'unauthenticated' && ( */}
      <nav>
        <LoginAndRegister>
          <HeaderLink href="/login">Entrar</HeaderLink>
          <HeaderLink href="/register">Cadastrar</HeaderLink>
        </LoginAndRegister>
      </nav>
      {/* )} */}
      <HeaderContent showMenu={showMenu} role="menubar">
        <nav>
          <ul>
            <HeaderLink href="/">
              <Image
                src="/assets/icon-light.png"
                alt="Ícone do site"
                width={25}
                height={25}
              />
              GetLearning
            </HeaderLink>
            <HeaderLink href="/makePost">Postar</HeaderLink>
          </ul>
        </nav>
      </HeaderContent>
      <OutOfMenu
        showMenu={showMenu}
        onClick={handleCloseMenu}
        data-testid="outOfMenu"
      />
    </HeaderContainer>
  );
}
