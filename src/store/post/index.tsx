import { Post } from 'types/post';
import { create } from 'zustand';

type PostStoreProps = {
  state: {
    post: Post | null;
  };
};

const usePostStore = create<PostStoreProps>(() => ({
  state: {
    post: null,
  },
}));

export default usePostStore;
