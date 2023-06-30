import { screen } from '@testing-library/react';
import renderComponent from 'tests/renderComponent';

import PostContent from '.';

describe('<PostContent/>', () => {
  it('should render the post content correcly', () => {
    renderComponent(
      <PostContent content="<a href='https://google.com.br'>Content</a>" />
    );

    expect(screen.getByRole('link', { name: 'Content' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Content' })).toHaveAttribute(
      'href',
      'https://google.com.br'
    );
  });
});
