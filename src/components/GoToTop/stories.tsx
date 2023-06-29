import { Meta, StoryObj } from '@storybook/react';
import { Providers } from 'providers/providers';

import GoToTop from '.';

export default {
  title: 'GoToTop',
  component: GoToTop,
  decorators: [
    (Story) => (
      <Providers>
        <div style={{ fontFamily: "'Open Sans', sans-serif", height: '400vh' }}>
          {Story()}

          <h1>Lorem ipsum dolor sit, amet</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
            doloremque qui eum maxime magni omnis sit, aliquam soluta distinctio
            nam dignissimos praesentium ut sunt porro incidunt molestias libero
            ab consectetur.
          </p>
          <h1>Lorem ipsum dolor sit, amet</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
            doloremque qui eum maxime magni omnis sit, aliquam soluta distinctio
            nam dignissimos praesentium ut sunt porro incidunt molestias libero
            ab consectetur.
          </p>
          <h1>Lorem ipsum dolor sit, amet</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
            doloremque qui eum maxime magni omnis sit, aliquam soluta distinctio
            nam dignissimos praesentium ut sunt porro incidunt molestias libero
            ab consectetur.
          </p>
          <h1>Lorem ipsum dolor sit, amet</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
            doloremque qui eum maxime magni omnis sit, aliquam soluta distinctio
            nam dignissimos praesentium ut sunt porro incidunt molestias libero
            ab consectetur.
          </p>
          <h1>Lorem ipsum dolor sit, amet</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
            doloremque qui eum maxime magni omnis sit, aliquam soluta distinctio
            nam dignissimos praesentium ut sunt porro incidunt molestias libero
            ab consectetur.
          </p>
          <h1>Lorem ipsum dolor sit, amet</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
            doloremque qui eum maxime magni omnis sit, aliquam soluta distinctio
            nam dignissimos praesentium ut sunt porro incidunt molestias libero
            ab consectetur.
          </p>
          <h1>Lorem ipsum dolor sit, amet</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
            doloremque qui eum maxime magni omnis sit, aliquam soluta distinctio
            nam dignissimos praesentium ut sunt porro incidunt molestias libero
            ab consectetur.
          </p>
        </div>
      </Providers>
    ),
  ],
} as Meta;

export const Template: StoryObj = {};
