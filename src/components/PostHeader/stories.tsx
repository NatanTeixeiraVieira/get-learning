import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'app/providers';

import PostInfoMock from 'components/PostInfo/mock';

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
          }}
        >
          {Story()}
        </div>
      </Providers>
    ),
  ],
  args: {
    title: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, eveniet?`,
    subtitle: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Doloremque, voluptatum repellat! Odit praesentium rem natus quos.
    Repellat odit saepe obcaecati fuga porro similique,
    eligendi doloribus veritatis neque totam cupiditate sint!`,
    imageSrc:
      'https://res.cloudinary.com/dlizakp2a/image/upload/v1614696630/Frozen_sunset_on_the_lake_by_Manuel_Arslanyan_9f9cd8ea10.jpg',
    postInfo: PostInfoMock,
  },
} as Meta<PostHeaderProps>;

export const Template: StoryObj<PostHeaderProps> = {};
