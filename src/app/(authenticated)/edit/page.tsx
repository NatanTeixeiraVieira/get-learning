import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import InitializerPostStore from 'store/post/initializerStore';
import { Post } from 'types/post';
import fetcher from 'utils/fetcher';

import CreateAndUpdatePost from 'components/CreateAndUpdatePost';

export const metadata: Metadata = {
  title: 'Publicar novo post',
};

type MakePostProps = {
  searchParams: {
    update?: string;
  };
};

export default async function EditPost({ searchParams }: MakePostProps) {
  const post = await fetcher<Post>(`/post/${searchParams.update}`, {
    next: { revalidate: 10 },
  });
  if (!post.ok) {
    notFound();
  }
  return (
    <>
      <InitializerPostStore post={post.datas} />
      <CreateAndUpdatePost title="Editar post" />
    </>
  );
}
