import { Metadata } from 'next';
import Link from 'next/link';

import { findAllPostsByCategorySlug } from 'services/post';

import { Container } from './styles';

import Heading from 'components/Heading';
import LoadMorePosts from 'components/LoadMorePosts';
import PostGrid from 'components/PostGrid';

type CategoryProps = {
  params: {
    categorySlug: string;
  };
  searchParams: {
    name: string;
  };
};

export const generateMetadata = async ({
  params,
  searchParams,
}: CategoryProps): Promise<Metadata> => {
  try {
    const response = await findAllPostsByCategorySlug(params.categorySlug);
    const categoryPosts = response.data._embedded.postsList;

    if (!categoryPosts) {
      return {
        title: 'Página não encontrada',
      };
    }
    return {
      title: `Categoria ${searchParams.name}`,
      description: `Página com posts da categoria ${searchParams.name}`,
    };
  } catch (err) {
    return {
      title: 'Página não encontrada',
    };
  }
};

export default async function Category({
  params,
  searchParams,
}: CategoryProps) {
  const handleLoadMorePosts = async (page: number) => {
    'use server';

    return findAllPostsByCategorySlug(params.categorySlug, page);
  };

  const response = await findAllPostsByCategorySlug(params.categorySlug);
  const categoryPosts = response.data?._embedded?.postsList;

  if (!categoryPosts) {
    return <div>Sem posts</div>;
  }

  return (
    <Container>
      <Heading>
        <Link
          href={{
            pathname: `/category/${params.categorySlug}`,
            query: {
              name: searchParams.name,
            },
          }}
        >
          {searchParams.name}
        </Link>
      </Heading>
      <PostGrid
        posts={categoryPosts}
        loadMorePosts={<LoadMorePosts service={handleLoadMorePosts} />}
      />
    </Container>
  );
}
