import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import InitializerEndpointStore from 'store/endpointGetPosts/initializerStore';
import usePostsStore from 'store/posts';
import InitializerPostsStore from 'store/posts/initializerStore';
import { Post } from 'types/post';
import fetcher from 'utils/fetcher';

import { Container } from './styles';

import Heading from 'components/Heading';
import PostGrid from 'components/PostGrid';
export const generateMetadata = async ({
  params,
  searchParams,
}: TagProps): Promise<Metadata> => {
  try {
    const tagPosts = await fetcher<Post[]>(
      `/posts/classification/tags?name=${searchParams.name}&slug=${params.tagSlug}`,
      {
        next: { revalidate: 10 },
      }
    );
    if (!tagPosts.datas[0]) {
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
  if (!searchParams.name) {
    notFound();
  }
  const postsEndpoint = `/posts/classification/tags?name=${searchParams.name}&slug=${params.tagSlug}`;
  const tagPosts = await fetcher<Post[]>(postsEndpoint, {
    next: { revalidate: 10 },
  });

  if (!tagPosts.datas[0]) {
    notFound();
  }

  usePostsStore.setState({ state: { posts: tagPosts.datas } });

  return (
    <Container>
      <InitializerPostsStore posts={tagPosts.datas} />
      <InitializerEndpointStore endpoint={postsEndpoint} />
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
