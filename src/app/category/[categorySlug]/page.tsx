import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import InitializerPostsStore from 'store/posts/initializerStore';
import { Post } from 'types/post';
import getDatas from 'utils/getDatas';

import { Container } from './styles';

import Heading from 'components/Heading';
import PostGrid from 'components/PostGrid';

export const generateMetadata = async ({
  params,
  searchParams,
}: CategoryProps): Promise<Metadata> => {
  try {
    const categoryPosts = await getDatas<Post[]>(
      `/posts/classification/categories?name=${searchParams.name}&slug=${params.categorySlug}`,
      {
        next: { revalidate: 10 },
      }
    );
    if (!categoryPosts[0]) {
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

type CategoryProps = {
  params: {
    categorySlug: string;
  };
  searchParams: {
    name: string;
  };
};

export default async function Category({
  params,
  searchParams,
}: CategoryProps) {
  const categoryPosts = await getDatas<Post[]>(
    `/posts/classification/categories?name=${searchParams.name}&slug=${params.categorySlug}`,
    {
      next: { revalidate: 10 },
    }
  );

  console.log(categoryPosts);

  if (!categoryPosts[0]) {
    notFound();
  }

  return (
    <Container>
      <InitializerPostsStore posts={categoryPosts} />
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
