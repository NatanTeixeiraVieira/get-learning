import { fireEvent, waitFor } from '@testing-library/react';
import postsListMock from 'mock/postsListMock';
import usePostsStore from 'store/posts';
import renderComponent from 'tests/renderComponent';

import LoadMorePosts from '.';

const usePostsStoreFile = { usePostsStore };

const usePostsStoreSpy = jest.spyOn(usePostsStoreFile, 'usePostsStore');
const addPosts = jest.fn();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(postsListMock),
  })
) as jest.Mock;

describe('<LoadMorePosts>', () => {
  it('should call addPosts one time', async () => {
    usePostsStoreSpy.mockReturnValue({ actions: { addPosts } });
    renderComponent(<LoadMorePosts />);

    fireEvent.scroll(window, {
      target: { scrollY: document.documentElement.offsetHeight },
    });

    await waitFor(() => expect(addPosts).toHaveBeenCalledTimes(1));
  });
});
