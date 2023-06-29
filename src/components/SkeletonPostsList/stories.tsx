import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'providers/providers';

import SkeletonPostsList from '.';

export default {
  title: 'SkeletonPostsList',
  component: SkeletonPostsList,
  decorators: [
    (Story) => (
      <Providers>
        <div
          style={{
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          {Story()}
        </div>
      </Providers>
    ),
  ],
} as Meta;

export const Template: StoryObj = {};
