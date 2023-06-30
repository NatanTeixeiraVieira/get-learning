import { screen } from '@testing-library/react';
import renderComponent from 'tests/renderComponent';

import HeaderLink from '.';

describe('<HeaderLink>', () => {
  it('should render HeaderLink correctly', () => {
    renderComponent(<HeaderLink name="Home" href="/" />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
