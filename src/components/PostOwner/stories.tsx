import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'providers/providers';

import PostOwner, { PostOwnerProps } from '.';

export default {
  title: 'PostOwner',
  component: PostOwner,
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
    name: 'Natãn Teixeira Vieira',
    avatarSrc: 'https://avatars.githubusercontent.com/NatanTeixeiraVieira',
    description: `
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maxime,
      facere molestiae fugit reprehenderit exercitationem maiores expedita dolor,
      sint accusamus aliquam esse suscipit temporibus corporis,
      molestias dolore quibusdam excepturi accusantium?
    `,
    showDescription: true,
  },
} as Meta<PostOwnerProps>;

export const Template: StoryObj<PostOwnerProps> = {};
