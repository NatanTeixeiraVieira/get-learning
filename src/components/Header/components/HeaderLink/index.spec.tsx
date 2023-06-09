import { render, screen } from '@testing-library/react';
import { Providers } from 'app/providers';

import HeaderLink from '.';

describe('<HeaderLink>', () => {
  it('should render HeaderLink correctly', () => {
    render(
      <Providers>
        <HeaderLink name="Home" href="/" />
      </Providers>
    );

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
