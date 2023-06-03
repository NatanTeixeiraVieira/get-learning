import { fireEvent, render, screen } from '@testing-library/react';
import { Providers } from 'app/providers';

import GoToTop from '.';

describe('<GoToTop />', () => {
  it('should render without GoToTop on screen', () => {
    render(
      <Providers>
        <GoToTop />
      </Providers>
    );

    expect(
      screen.queryByRole('link', { name: 'Ir para o topo' })
    ).not.toBeInTheDocument();
  });
  it('should render GoToTop on screen correcly', () => {
    render(
      <Providers>
        <GoToTop />
      </Providers>
    );
    fireEvent.scroll(window, { target: { scrollY: 101 } });

    expect(
      screen.getByRole('link', { name: 'Ir para o topo' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Ir para o topo' })
    ).toHaveAttribute('href', '#');
  });
});
