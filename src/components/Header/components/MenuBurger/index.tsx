import { MouseEventHandler } from 'react';

import { Container } from './styles';

export type MenuBurgerProps = {
  onClick: MouseEventHandler<HTMLElement>;
  showMenu: boolean;
};

export default function MenuBurger({ onClick, showMenu }: MenuBurgerProps) {
  return (
    <Container onClick={onClick} showMenu={showMenu}>
      <span></span>
      <span></span>
      <span></span>
    </Container>
  );
}
