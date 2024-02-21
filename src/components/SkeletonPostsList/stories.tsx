import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'providers/providers';

import SkeletonPostsListRoot from '.';

export default {
  title: 'SkeletonPostsList',
  component: SkeletonPostsListRoot,
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
