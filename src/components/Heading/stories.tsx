import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'providers/providers';

import light from 'styles/themes/light';

import Heading, { HeadingProps } from '.';

export default {
  title: 'Heading',
  component: Heading,
  decorators: [
    (Story) => (
      <Providers>
        <div style={{ fontFamily: "'Open Sans', sans-serif" }}>{Story()}</div>
      </Providers>
    ),
  ],
  args: {
    children: 'Hello, world',
    as: 'h1',
  },
} as Meta<HeadingProps>;

export const Light: StoryObj<HeadingProps> = {};
export const Dark: StoryObj<HeadingProps> = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: light.colors.primary }],
    },
  },
  args: {
    white: true,
  },
};
