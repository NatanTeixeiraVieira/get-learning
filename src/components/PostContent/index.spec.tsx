import { render, screen } from '@testing-library/react';
import { Providers } from 'app/providers';

import PostContent from '.';

describe('<PostContent/>', () => {
  it('should render the post content correcly', () => {
    render(
      <Providers>
        <PostContent content="<a href='https://google.com.br'>Content</a>" />
      </Providers>
    );

    expect(screen.getByRole('link', { name: 'Content' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Content' })).toHaveAttribute(
      'href',
      'https://google.com.br'
    );
  });
});
