import { ThemeProvider } from 'styled-components';

import { render, screen } from '@testing-library/react';
import StyledComponentsRegistry from 'lib/registry';

import GlobalStyles from 'styles/global';
import light from 'styles/themes/light';

import Main from '.';

describe('Main', () => {
  it('should render main correctly', () => {
    render(
      <StyledComponentsRegistry>
        <ThemeProvider theme={light}>
          <GlobalStyles />
          <Main />
        </ThemeProvider>
      </StyledComponentsRegistry>,
    );

    expect(screen.getByText(/hello, world/i)).toBeInTheDocument();
  });
});
