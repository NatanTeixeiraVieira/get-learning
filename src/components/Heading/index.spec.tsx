import { ThemeProvider } from 'styled-components';

import { render, screen } from '@testing-library/react';

import GlobalStyles from 'styles/global';
import light from 'styles/themes/light';

import Heading from '.';

describe('<Heading/>', () => {
  it('should render correctly whith defaults props', () => {
    render(
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Heading>Hello, world</Heading>
      </ThemeProvider>
    );

    expect(screen.getByRole('heading', { name: 'Hello, world' })).toHaveStyle({
      color: light.colors.text.primary,
      fontSize: light.font.sizes.large,
      textTransform: 'none',
    });
  });
  it('should render correctly font sizes', () => {
    const { rerender } = render(
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Heading size="xsmall">Hello, world</Heading>
      </ThemeProvider>
    );

    expect(screen.getByRole('heading', { name: 'Hello, world' })).toHaveStyle({
      fontSize: light.font.sizes.xsmall,
    });

    rerender(
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Heading size="small">Hello, world</Heading>
      </ThemeProvider>
    );
    expect(screen.getByRole('heading', { name: 'Hello, world' })).toHaveStyle({
      fontSize: light.font.sizes.small,
    });

    rerender(
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Heading size="medium">Hello, world</Heading>
      </ThemeProvider>
    );
    expect(screen.getByRole('heading', { name: 'Hello, world' })).toHaveStyle({
      fontSize: light.font.sizes.medium,
    });

    rerender(
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Heading size="large">Hello, world</Heading>
      </ThemeProvider>
    );
    expect(screen.getByRole('heading', { name: 'Hello, world' })).toHaveStyle({
      fontSize: light.font.sizes.large,
    });
  });
  it('should render correctly whith uppercase letters', () => {
    render(
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Heading uppercase>Hello, world</Heading>
      </ThemeProvider>
    );

    expect(screen.getByRole('heading', { name: 'Hello, world' })).toHaveStyle({
      textTransform: 'uppercase',
    });
  });
  it('should render correctly heading element', () => {
    const { container } = render(
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Heading as="h6">Hello, world</Heading>
      </ThemeProvider>
    );

    expect(container.querySelector('h6')).toBeInTheDocument();
  });
});
