'use client';

import { useState } from 'react';

import { Sun } from 'lucide-react';

import { HeaderContainer, HeaderContent, OutOfMenu, ThemeIcon } from './styles';

import HeaderLink from 'components/HeaderLink';
import MenuBurger from 'components/MenuBurger';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

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
            <HeaderLink href="/" name="GetLearning" />
            <HeaderLink href="/" name="Postar" />
          </ul>
        </nav>
        <ul>
          <ThemeIcon>
            <Sun />
          </ThemeIcon>
          <HeaderLink href="/" name="Login" />
          <HeaderLink href="/register" name="Cadastrar" />
        </ul>
      </HeaderContent>
      <OutOfMenu
        showMenu={showMenu}
        onClick={closeMenu}
        data-testid="outOfMenu"
      />
    </HeaderContainer>
  );
}
