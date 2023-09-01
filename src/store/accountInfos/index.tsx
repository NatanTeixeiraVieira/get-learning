import { create } from 'zustand';

type DialogBoxDescriptor = 'name' | 'description' | null;

type AccountInfosStoreProps = {
  state: {
    editIsOpen: boolean;
    dialogBoxDescriptor: DialogBoxDescriptor;
  };
  actions: {
    handleOpenDialogBox: (dialogBoxDescriptor: DialogBoxDescriptor) => void;
    closeDialogBox: () => void;
  };
};

const useAccountInfosStore = create<AccountInfosStoreProps>((set) => {
  return {
    state: {
      editIsOpen: false,
      dialogBoxDescriptor: null,
    },
    actions: {
      handleOpenDialogBox: (dialogBoxDescriptor) => {
        set((state) => ({
          state: { ...state.state, dialogBoxDescriptor, editIsOpen: true },
        }));
      },
      closeDialogBox: () => {
        set((state) => ({
          state: { ...state.state, editIsOpen: false },
        }));
      },
    },
  };
});

export default useAccountInfosStore;
