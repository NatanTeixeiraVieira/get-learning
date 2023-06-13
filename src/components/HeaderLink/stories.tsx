import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'app/providers';

import light from 'styles/themes/light';

import HeaderLink, { HeaderLinkProps } from '.';

export default {
  title: 'HeaderLink',
  component: HeaderLink,
  decorators: [
    (Story) => (
      <Providers>
        <div style={{ fontFamily: "'Open Sans', sans-serif" }}>{Story()}</div>
      </Providers>
    ),
  ],
  args: {
    href: '/',
    name: 'Home',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: light.colors.primary }],
    },
  },
} as Meta<HeaderLinkProps>;

export const Template: StoryObj<HeaderLinkProps> = {};
