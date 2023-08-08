import { create } from 'zustand';

type EndpointStoreProps = {
  state: {
    endpoint: string;
  };
  actions: {
    addEndpoint: (endpoint: string) => void;
  };
};

const useEndpointStore = create<EndpointStoreProps>((set) => ({
  state: {
    endpoint: '',
  },
  actions: {
    addEndpoint: (endpoint) =>
      set((state) => ({
        state: { ...state.state, endpoint },
      })),
  },
}));

export default useEndpointStore;
