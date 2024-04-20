import { Post } from 'types/findAllPosts';
import { create } from 'zustand';

type PostsStoreProps = {
  state: {
    posts: Post[];
  };
  actions: {
    addNewPost: (post: Post) => void;
    loadMorePosts: (posts: Post[]) => void;
  };
};

export const usePostsStore = create<PostsStoreProps>((set) => ({
  state: {
    posts: [],
  },
  actions: {
    addNewPost: (post) => {
      set((state) => ({
        state: {
          posts: [post, ...state.state.posts],
        },
      }));
    },
    loadMorePosts: (posts) => {
      set((state) => ({
        state: {
          posts: [...state.state.posts, ...posts],
        },
      }));
    },
  },
}));
