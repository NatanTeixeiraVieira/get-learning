import { Metadata } from 'next';

import CreateAndUpdatePost from 'components/CreateAndUpdatePost';

export const metadata: Metadata = {
  title: 'Publicar novo post',
};

export default function MakePost() {
  return <CreateAndUpdatePost title="Publicar novo post" />;
}
