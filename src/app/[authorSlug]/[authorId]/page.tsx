import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getCurrentUser } from 'lib/session';
import getAuthorLoggedInfos from 'services/getAuthorLoggedInfos';
import InitializerEndpointStore from 'store/endpointGetPosts/initializerStore';
import usePostsStore from 'store/posts';
import InitializerPostsStore from 'store/posts/initializerStore';
import { Author } from 'types/author';
import { Post } from 'types/post';
import fetcher from 'utils/fetcher';
import { textFormatter } from 'utils/textFormatter';

import { Button } from 'components/Button';
import Heading from 'components/Heading';
import PostGrid from 'components/PostGrid';
import PostOwner from 'components/PostOwner';

import { NoPostFound, Wrapper } from './style';

export const generateMetadata = async ({
  params,
}: AuthorProps): Promise<Metadata> => {
  try {
    const author = await fetcher<Author>(`/author/id/${params.authorId}`, {
      next: { revalidate: 10 },
    });
    return {
      title: `${author.datas.name}`,
      description: author.datas.description,
    };
  } catch (err) {
    return {
      title: 'Página não encontrada',
    };
  }
};

type AuthorProps = {
  params: {
    authorSlug: string;
    authorId: string;
  };
};

export default async function Author({ params }: AuthorProps) {
  const postsEndpoint = `/posts/author/${params.authorId}`;
  const authorPosts = await fetcher<Post[]>(postsEndpoint);

  if (!authorPosts.datas) {
    notFound();
  }

  const author = await fetcher<Author>(`/author/id/${params.authorId}`, {
    next: { revalidate: 10 },
  });

  if (!author.datas) {
    notFound();
  }

  if (authorPosts.datas.length === 0) {
    return (
      <Wrapper>
        <PostOwner
          avatarSrc={author.datas.avatar?.url}
          name={author.datas.name}
          description={textFormatter(author.datas.description)}
          slug={author.datas.slug}
          authorId={author.datas.authorId}
        />
        <NoPostFound>
          <Heading>Nenhum post encontrado</Heading>
          <p>Você ainda não publicou nada ainda</p>
          <Link href="/makePost">
            <Button.Root type="button" width="10rem">
              Publicar
            </Button.Root>
          </Link>
        </NoPostFound>
      </Wrapper>
    );
  }

  const session = await getCurrentUser();
  const authorLoggedInfos = (await getAuthorLoggedInfos(session?.email)).datas;

  const isPostOwner = authorLoggedInfos?.authorId === author.datas.authorId;

  usePostsStore.setState({ state: { posts: authorPosts.datas } });

  return (
    <Wrapper>
      <InitializerPostsStore posts={authorPosts.datas} />
      <InitializerEndpointStore endpoint={postsEndpoint} />
      <PostOwner
        avatarSrc={author.datas.avatar?.url}
        name={author.datas.name}
        description={textFormatter(author.datas.description)}
        slug={author.datas.slug}
        authorId={author.datas.authorId}
      />
      <PostGrid isPostOwner={isPostOwner} />
    </Wrapper>
  );
}
