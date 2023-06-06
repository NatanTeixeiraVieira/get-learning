import { render, screen } from '@testing-library/react';
import { Providers } from 'app/providers';
import { dateFormatter } from 'utils/dateFormatter';

import PostInfo from '.';
import mock from './mock';

describe('<PostInfo />', () => {
  it('should render PostInfo correctly', () => {
    render(
      <Providers>
        <PostInfo {...mock} />
      </Providers>
    );
    expect(screen.getByText(/Por/i)).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: mock.author.displayName })
    ).toHaveAttribute('href', `/author/${mock.author.slug}`);

    expect(screen.getByText(dateFormatter(mock.createdAt))).toHaveAttribute(
      'datetime',
      mock.createdAt
    );

    expect(
      screen.getByRole('link', { name: mock.categories[0].displayName })
    ).toHaveAttribute('href', `/category/${mock.categories[0].slug}`);
    expect(
      screen.getByRole('link', { name: mock.categories[1].displayName })
    ).toHaveAttribute('href', `/category/${mock.categories[1].slug}`);
  });
});
