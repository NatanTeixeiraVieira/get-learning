import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { userKey } from 'constants/cookiesKeys';
import { findAuthorById } from 'services/author';
import { findAllPostsByAuthorId } from 'services/post';
import { getServerAuthentication } from 'utils/getServerAuthentication';
import { textFormatter } from 'utils/textFormatter';

import { Button } from 'components/Button';
import Heading from 'components/Heading';
import LoadMorePosts from 'components/LoadMorePosts';
import PostGrid from 'components/PostGrid';
import PostOwner from 'components/PostOwner';

import { NoPostFound, Wrapper } from './style';

type AuthorProps = {
  params: {
    authorSlug: string;
    authorId: string;
  };
};

export const generateMetadata = async ({
  params,
}: AuthorProps): Promise<Metadata> => {
  const author = await findAuthorById(params.authorId);
  return {
    title: `${author.data.name}`,
    description: author.data.description,
  };
};

export default async function Author({ params }: AuthorProps) {
  const [authorPostsRequest, author] = await Promise.all([
    findAllPostsByAuthorId(params.authorId),
    findAuthorById(params.authorId),
  ]);
  const handleLoadMoreAuthorPosts = async (page: number) => {
    'use server';

    return findAllPostsByAuthorId(params.authorId, page);
  };

  const authorPosts = authorPostsRequest.data?._embedded?.postsList;
  const isPostOwner =
    author.data.id === getServerAuthentication().user?.authorId;

  if (authorPostsRequest.data.page.totalElements === 0) {
    return (
      <Wrapper>
        <PostOwner
          avatarSrc={author.data.image?.url}
          name={author.data.name}
          description={textFormatter(author.data.description)}
          slug={author.data.slug}
          authorId={author.data.id}
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

  return (
    <Wrapper>
      <PostOwner
        avatarSrc={author.data.image?.url}
        name={author.data.name}
        description={textFormatter(author.data.description)}
        slug={author.data.slug}
        authorId={author.data.id}
      />
      <PostGrid
        posts={authorPosts}
        isPostOwner={isPostOwner}
        loadMorePosts={
          <LoadMorePosts
            service={handleLoadMoreAuthorPosts}
            isPostOwner={isPostOwner}
          />
        }
      />
    </Wrapper>
  );
}
