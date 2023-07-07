import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'providers/providers';

import NotFound from './page';

export default {
  title: 'NotFound',
  component: NotFound,
  decorators: [
    (Story) => (
      <Providers>
        <div style={{ fontFamily: "'Open Sans', sans-serif" }}>{Story()}</div>
      </Providers>
    ),
  ],
} as Meta;

export const Template: StoryObj = {};
