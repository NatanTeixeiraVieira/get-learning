import { screen } from '@testing-library/react';
import postsListMock from 'mock/postsListMock';
import InitializerPostsStore from 'store/posts/initializerStore';
import renderComponent from 'tests/renderComponent';

import PostGrid from '.';

describe('<PostGrid>', () => {
  it('should render a grid of posts on screen', () => {
    renderComponent(
      <>
        <InitializerPostsStore posts={postsListMock} />
        <PostGrid />
      </>
    );

    expect(
      screen.getByRole('img', { name: postsListMock[0].title })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: postsListMock[1].title })
    ).toBeInTheDocument();
  });
});
