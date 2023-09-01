import { MouseEventHandler } from 'react';

import { Pencil } from 'lucide-react';

import { Container, Descriptor, Info, PencilIcon } from './styles';

type AccountConfigInfoProps = {
  descriptor: string;
  pencil?: boolean;
  info: string | undefined;
  onClickEdit?: MouseEventHandler;
};

export default function AccountConfigInfo({
  descriptor,
  info,
  pencil = true,
  onClickEdit,
}: AccountConfigInfoProps) {
  return (
    <Container>
      <Descriptor>
        <strong>{descriptor}</strong>
      </Descriptor>
      <Info>{info ?? ''}</Info>
      {pencil && (
        <PencilIcon title="Editar" onClick={onClickEdit}>
          <Pencil size="1.3rem" />
        </PencilIcon>
      )}
    </Container>
  );
}
