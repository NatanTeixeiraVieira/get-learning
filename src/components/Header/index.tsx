'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

import { HeaderContainer, HeaderContent, OutOfMenu } from './styles';

import HeaderLink from 'components/HeaderLink';
import MenuBurger from 'components/MenuBurger';
import UserAccount from 'components/UserAccount';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { status } = useSession();

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <HeaderContainer>
      <MenuBurger onClick={handleShowMenu} showMenu={showMenu} />
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
        {status === 'authenticated' && <UserAccount />}

        {status === 'unauthenticated' && (
          <ul>
            <HeaderLink href="/login">Entrar</HeaderLink>
            <HeaderLink href="/register">Cadastrar</HeaderLink>
          </ul>
        )}
      </HeaderContent>
      <OutOfMenu
        showMenu={showMenu}
        onClick={closeMenu}
        data-testid="outOfMenu"
      />
    </HeaderContainer>
  );
}
