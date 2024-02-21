import { Meta, StoryObj } from '@storybook/react';
import postMock from 'mock/postMock';
import { Providers } from 'providers/providers';
import { textFormatter } from 'utils/textFormatter';

import PostHeader, { PostHeaderProps } from '.';

export default {
  title: 'PostHeader',
  component: PostHeader,
  decorators: [
    (Story) => (
      <Providers>
        <div
          style={{
            fontFamily: "'Open Sans', sans-serif",
            width: '60vw',
            margin: '0 auto',
          }}
        >
          {Story()}
        </div>
      </Providers>
    ),
  ],
  args: {
    title: postMock.title,
    subtitle: textFormatter(postMock.excerpt),
    imageSrc: postMock.coverImage.url,
    createdAt: postMock.createdAt,
    category: postMock.category,
  },
} as Meta<PostHeaderProps>;

export const Template: StoryObj<PostHeaderProps> = {};
