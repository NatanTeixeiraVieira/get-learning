'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Trash2 } from 'lucide-react';
import { deletePost } from 'services/post';

import { Container } from './styles';

import { DialogBox } from 'components/DialogBox';

type DeletePostProps = {
  postId: string;
};

export default function DeletePost({ postId }: DeletePostProps) {
  const router = useRouter();
  const [showDialogBox, setShowDialogBox] = useState(false);

  const handleCloseDialogBox = () => {
    setShowDialogBox(false);
  };

  const handleDeletePost = async () => {
    handleCloseDialogBox();
    const response = await deletePost(postId);
    if (response.success) {
      toast.success('Post deletado com sucesso.');
      router.refresh();
      return;
    }
    toast.error(
      'Falha ao deletar o post. Por favor, tente novamente mais tarde'
    );
  };

  return (
    <>
      <DialogBox.Root open={showDialogBox}>
        <DialogBox.Title text="Tem certeza que deseja deletar esse post?" />
        <DialogBox.Message text="Isso deletará permanentemente o post. Esta ação não pode ser desfeita." />
        <DialogBox.Actions>
          <DialogBox.Button variant="secondary" onClick={handleCloseDialogBox}>
            Cancelar
          </DialogBox.Button>
          <DialogBox.Button variant="destructive" onClick={handleDeletePost}>
            Deletar
          </DialogBox.Button>
        </DialogBox.Actions>
      </DialogBox.Root>
      <Container title="Excluir">
        <Trash2 size="1rem" onClick={() => setShowDialogBox(true)} />
      </Container>
    </>
  );
}
