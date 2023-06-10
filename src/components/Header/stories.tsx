import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'app/providers';

import Header from '.';

export default {
  title: 'Header',
  component: Header,
  decorators: [
    (Story) => (
      <Providers>
        <div style={{ fontFamily: "'Open Sans', sans-serif" }}>{Story()}</div>
      </Providers>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Template: StoryObj = {};
