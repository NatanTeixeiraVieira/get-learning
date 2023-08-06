import { ReactNode } from 'react';

import { Actions } from './styles';

type DialogBoxActionsProps = {
  children: ReactNode;
};

export default function DialogBoxActions({ children }: DialogBoxActionsProps) {
  return <Actions>{children}</Actions>;
}
