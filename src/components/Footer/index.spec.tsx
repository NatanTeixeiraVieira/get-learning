import { screen } from '@testing-library/react';
import renderComponent from 'tests/renderComponent';

import Footer from '.';

describe('<Footer />', () => {
  it('shold render footer correctly', () => {
    renderComponent(<Footer />);

    expect(
      screen.getByText(/Feito com ❤️ por Natãn Teixeira Vieira/i)
    ).toBeInTheDocument();
  });
});
