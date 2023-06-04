import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'app/providers';

import PostContent, { PostContentProps } from '.';
import mock from './mock';

export default {
  title: 'PostContent',
  component: PostContent,
  decorators: [
    (Story) => (
      <Providers>
        <div
          style={{
            fontFamily: "'Open Sans', sans-serif",
            maxWidth: '60vw',
            margin: '0 auto',
          }}
        >
          {Story()}
        </div>
      </Providers>
    ),
  ],
  args: {
    content: mock,
  },
} as Meta<PostContentProps>;

export const Template: StoryObj<PostContentProps> = {};
