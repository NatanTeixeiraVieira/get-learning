import { screen } from '@testing-library/react';
import postMock from 'mock/postMock';
import renderComponent from 'tests/renderComponent';
import { dateFormatter } from 'utils/dateFormatter';

import PostInfo from '.';

describe('<PostInfo />', () => {
  it('should render PostInfo correctly', () => {
    renderComponent(
      <PostInfo
        author={postMock.author}
        categories={postMock.categories}
        createdAt={postMock.createdAt}
      />
    );
    expect(screen.getByText(/Por/i)).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: postMock.author.name })
    ).toHaveAttribute('href', `/author/${postMock.author.slug}`);

    expect(screen.getByText(dateFormatter(postMock.createdAt))).toHaveAttribute(
      'datetime',
      postMock.createdAt.toString()
    );

    expect(
      screen.getByRole('link', { name: postMock.categories[0].name })
    ).toHaveAttribute('href', `/category/${postMock.categories[0].slug}`);
    expect(
      screen.getByRole('link', { name: postMock.categories[1].name })
    ).toHaveAttribute('href', `/category/${postMock.categories[1].slug}`);
  });
});
