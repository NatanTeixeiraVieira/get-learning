import { fireEvent, screen } from '@testing-library/react';
import renderComponent from 'tests/renderComponent';

import GoToTop from '.';

describe('<GoToTop />', () => {
  it('should render without GoToTop on screen', () => {
    renderComponent(<GoToTop />);

    expect(
      screen.queryByRole('link', { name: 'Ir para o topo' })
    ).not.toBeInTheDocument();
  });
  it('should render GoToTop on screen correcly', () => {
    renderComponent(<GoToTop />);

    fireEvent.scroll(window, { target: { scrollY: 101 } });

    expect(
      screen.getByRole('link', { name: 'Ir para o topo' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Ir para o topo' })
    ).toHaveAttribute('href', '#');

    fireEvent.scroll(window, { target: { scrollY: 99 } });
    expect(
      screen.queryByRole('link', { name: 'Ir para o topo' })
    ).not.toBeInTheDocument();
  });
});
