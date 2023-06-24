import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'app/providers';
import postMock from 'mock/postMock';

import PostInfo, { PostInfoProps } from '.';

export default {
  title: 'PostInfo',
  component: PostInfo,
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
  args: {
    createdAt: postMock.createdAt,
    author: postMock.author,
    categories: postMock.categories,
  },
  argTypes: {
    createdAt: {
      control: {
        type: 'date',
      },
    },
  },
} as Meta<PostInfoProps>;

export const Template: StoryObj<PostInfoProps> = {};
