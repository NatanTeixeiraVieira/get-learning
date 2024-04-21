import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { findAllPostsByTagSlug } from 'services/post';

import { Container } from './styles';

import Heading from 'components/Heading';
import LoadMorePosts from 'components/LoadMorePosts';
import PostGrid from 'components/PostGrid';

type TagProps = {
  params: {
    tagSlug: string;
  };
  searchParams: {
    name: string;
  };
};

export const generateMetadata = async ({
  params,
  searchParams,
}: TagProps): Promise<Metadata> => {
  try {
    const tagPosts = await findAllPostsByTagSlug(params.tagSlug);
    if (!tagPosts.data) {
      return {
        title: 'Página não encontrada',
      };
    }
    return {
      title: `Tag ${searchParams.name}`,
      description: `Página com posts da tag ${searchParams.name}`,
    };
  } catch (err) {
    return {
      title: 'Página não encontrada',
    };
  }
};

export default async function Tag({ params, searchParams }: TagProps) {
  if (!searchParams.name) {
    notFound();
  }

  const handleLoadMorePosts = async (page: number) => {
    'use server';

    return findAllPostsByTagSlug(params.tagSlug, page);
  };

  const response = await findAllPostsByTagSlug(params.tagSlug);
  const tagPosts = response.data._embedded.postsList;

  if (!tagPosts) {
    notFound();
  }

  return (
    <Container>
      <Heading>
        <Link
          href={{
            pathname: `/tag/${params.tagSlug}`,
            query: {
              name: searchParams.name,
            },
          }}
        >
          #{searchParams.name}
        </Link>
      </Heading>
      <PostGrid
        posts={tagPosts}
        loadMorePosts={<LoadMorePosts service={handleLoadMorePosts} />}
      />
    </Container>
  );
}
