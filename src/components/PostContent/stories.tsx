import { Meta, StoryObj } from '@storybook/react';
import postMock from 'mock/postMock';
import { Providers } from 'providers/providers';

import PostContent, { PostContentProps } from '.';

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
    content: postMock.content,
  },
} as Meta<PostContentProps>;

export const Template: StoryObj<PostContentProps> = {};
