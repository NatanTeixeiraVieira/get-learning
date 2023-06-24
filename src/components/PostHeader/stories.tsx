import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'app/providers';
import postMock from 'mock/postMock';
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
    subtitle: textFormatter(postMock.subtitle),
    imageSrc: postMock.coverImage.url,
    createdAt: postMock.createdAt,
    author: postMock.author,
    categories: postMock.categories,
  },
} as Meta<PostHeaderProps>;

export const Template: StoryObj<PostHeaderProps> = {};
