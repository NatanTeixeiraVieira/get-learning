import { render, screen } from '@testing-library/react';
import { Providers } from 'app/providers';

import Footer from '.';

describe('<Footer/>', () => {
  it('shold render footer correctly', () => {
    render(
      <Providers>
        <Footer />
      </Providers>
    );

    expect(
      screen.getByText(/Feito com ❤️ por Natãn Teixeira Vieira/i)
    ).toBeInTheDocument();
  });
});
