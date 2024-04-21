'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';

import { useRouteChange } from 'hooks/useRouteChange';

import { HeaderContent } from './styles';
import { OutOfMenu } from 'components/Header/styles';

import HeaderLink from 'components/HeaderLink';
import MenuBurger from 'components/MenuBurger';

export default function AsideNavbar() {
  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  useRouteChange(handleCloseMenu);

  return (
    <>
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
      </HeaderContent>
      <OutOfMenu
        showMenu={showMenu}
        onClick={handleCloseMenu}
        data-testid="outOfMenu"
      />
    </>
  );
}
