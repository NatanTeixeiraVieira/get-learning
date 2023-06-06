import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'app/providers';

import PostInfo, { PostInfoProps } from '.';
import mock from './mock';

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
  args: mock,
  argTypes: {
    createdAt: {
      control: {
        type: 'date',
      },
    },
  },
} as Meta<PostInfoProps>;

export const Template: StoryObj<PostInfoProps> = {};
