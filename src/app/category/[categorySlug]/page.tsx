import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import usePostsStore from 'store/posts';
import InitializerPostsStore from 'store/posts/initializerStore';
import { Post } from 'types/post';
import fetcher from 'utils/fetcher';

import { Container } from './styles';

import Heading from 'components/Heading';
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
    const categoryPosts = await fetcher<Post[]>(
      `/posts/classification/category?name=${searchParams.name}&slug=${params.categorySlug}`,
      {
        next: { revalidate: 10 },
      }
    );
    if (!categoryPosts.datas[0]) {
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
  if (!searchParams.name) {
    notFound();
  }
  const categoryPosts = await fetcher<Post[]>(
    `/posts/classification/category?name=${searchParams.name}&slug=${params.categorySlug}`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!categoryPosts.datas[0]) {
    notFound();
  }

  usePostsStore.setState({ state: { posts: categoryPosts.datas } });

  return (
    <Container>
      <InitializerPostsStore posts={categoryPosts.datas} />
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
      <PostGrid />
    </Container>
  );
}
