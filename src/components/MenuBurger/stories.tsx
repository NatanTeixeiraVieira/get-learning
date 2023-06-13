import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'app/providers';

import light from 'styles/themes/light';

import MenuBurger, { MenuBurgerProps } from '.';

const handleShowMenu = () => {
  console.log('Ok');
};

export default {
  title: 'MenuBurger',
  component: MenuBurger,
  decorators: [
    (Story) => (
      <Providers>
        <div style={{ fontFamily: "'Open Sans', sans-serif" }}>{Story()}</div>
      </Providers>
    ),
  ],
  args: {
    onClick: handleShowMenu,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: light.colors.primary }],
    },
  },
} as Meta<MenuBurgerProps>;

export const OpenedMenu: StoryObj<MenuBurgerProps> = {
  args: {
    showMenu: true,
  },
};
export const ClosedMenu: StoryObj<MenuBurgerProps> = {
  args: {
    showMenu: false,
  },
};
