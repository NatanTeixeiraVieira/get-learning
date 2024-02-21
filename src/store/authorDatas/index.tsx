import { create } from 'zustand';

type PostStoreProps = {
  state: {
    temporaryName: string | null;
    temporaryPassword: string | null;
  };
  actions: {
    addTemporaryDatas: (name: string, password: string) => void;
  };
};

const useAuthorDatas = create<PostStoreProps>((set) => ({
  state: {
    temporaryName: null,
    temporaryPassword: null,
  },
  actions: {
    addTemporaryDatas(password, name) {
      set(() => ({
        state: {
          temporaryName: name,
          temporaryPassword: password,
        },
      }));
    },
  },
}));

export default useAuthorDatas;
