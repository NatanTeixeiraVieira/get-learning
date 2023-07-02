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
}: TagProps): Promise<Metadata> => {
  try {
    const tagPosts = await getDatas<Post[]>(
      `/posts/classification/tags?name=${searchParams.name}&slug=${params.tagSlug}`,
      {
        next: { revalidate: 10 },
      }
    );
    if (!tagPosts[0]) {
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

type TagProps = {
  params: {
    tagSlug: string;
  };
  searchParams: {
    name: string;
  };
};

export default async function Tag({ params, searchParams }: TagProps) {
  const tagPosts = await getDatas<Post[]>(
    `/posts/classification/tags?name=${searchParams.name}&slug=${params.tagSlug}`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!tagPosts[0]) {
    notFound();
  }

  return (
    <Container>
      <InitializerPostsStore posts={tagPosts} />
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
      <PostGrid />
    </Container>
  );
}
