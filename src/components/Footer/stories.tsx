import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'providers/providers';

import Footer from '.';

export default {
  title: 'Footer',
  component: Footer,
  decorators: [
    (Story) => (
      <Providers>
        <div style={{ fontFamily: "'Open Sans', sans-serif" }}>{Story()}</div>
      </Providers>
    ),
  ],
} as Meta;

export const Template: StoryObj = {};
