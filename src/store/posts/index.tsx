import { Post } from 'types/post';
import { create } from 'zustand';

type PostStoreProps = {
  state: {
    posts: Post[];
  };
  actions: {
    addPosts: (posts: Post[]) => void;
  };
};

const usePostsStore = create<PostStoreProps>((set) => ({
  state: {
    posts: [],
  },
  actions: {
    addPosts: (posts) =>
      set((state) => ({
        state: { posts: [...state.state.posts, ...posts] },
      })),
  },
}));

export default usePostsStore;
