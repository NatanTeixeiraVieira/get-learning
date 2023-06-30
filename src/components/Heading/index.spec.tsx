import { render, screen } from '@testing-library/react';
import { Providers } from 'providers/providers';
import renderComponent from 'tests/renderComponent';

import light from 'styles/themes/light';

import Heading from '.';

describe('<Heading/>', () => {
  it('should render correctly whith defaults props', () => {
    renderComponent(<Heading>Hello, world</Heading>);

    expect(screen.getByRole('heading', { name: 'Hello, world' })).toHaveStyle({
      color: light.colors.text.primary,
      fontSize: light.font.sizes.large,
      textTransform: 'none',
    });
  });
  it('should render correctly font sizes', () => {
    const { rerender } = renderComponent(
      <Heading size="xsmall">Hello, world</Heading>
    );

    expect(screen.getByRole('heading', { name: 'Hello, world' })).toHaveStyle({
      fontSize: light.font.sizes.xsmall,
    });

    rerender(
      <Providers>
        <Heading size="small">Hello, world</Heading>
      </Providers>
    );
    expect(screen.getByRole('heading', { name: 'Hello, world' })).toHaveStyle({
      fontSize: light.font.sizes.small,
    });

    rerender(
      <Providers>
        <Heading size="medium">Hello, world</Heading>
      </Providers>
    );
    expect(screen.getByRole('heading', { name: 'Hello, world' })).toHaveStyle({
      fontSize: light.font.sizes.medium,
    });

    rerender(
      <Providers>
        <Heading size="large">Hello, world</Heading>
      </Providers>
    );
    expect(screen.getByRole('heading', { name: 'Hello, world' })).toHaveStyle({
      fontSize: light.font.sizes.large,
    });
  });
  it('should render correctly whith uppercase letters', () => {
    render(
      <Providers>
        <Heading uppercase>Hello, world</Heading>
      </Providers>
    );

    expect(screen.getByRole('heading', { name: 'Hello, world' })).toHaveStyle({
      textTransform: 'uppercase',
    });
  });
  it('should render correctly heading element', () => {
    const { container } = render(
      <Providers>
        <Heading as="h6">Hello, world</Heading>
      </Providers>
    );

    expect(container.querySelector('h6')).toBeInTheDocument();
  });
});
