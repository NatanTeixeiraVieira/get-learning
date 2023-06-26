import { Metadata } from 'next';

import usePostsStore from 'store/posts';
import { Post } from 'types/post';
import getDatas from 'utils/getDatas';
import { textFormatter } from 'utils/textFormatter';

import { Wrapper } from './styles';

import GoToTop from 'components/GoToTop';
import PostContent from 'components/PostContent';
import PostHeader from 'components/PostHeader';
import PostOwner from 'components/PostOwner';

export const generateMetadata = async ({
  params,
}: PostProps): Promise<Metadata> => {
  try {
    const post = await getDatas<Post>(`/post/${params.id}`, {
      next: { revalidate: 10 },
    });
    return {
      title: `${post.title} - ${post.author.name}`,
      description: post.subtitle,
    };
  } catch (err) {
    return {
      title: 'Página não encontrada',
    };
  }
};

export const generateStaticParams = async () => {
  const { posts } = usePostsStore.getState().state;
  const ids = posts.map((post) => ({
    id: `${post.id}`,
  }));

  return ids;
};

type PostProps = {
  params: {
    id: string;
  };
};

export default async function Post({ params }: PostProps) {
  const post = await getDatas<Post>(`/post/${params.id}`, {
    next: { revalidate: 10 },
  });

  return (
    <>
      <Wrapper>
        <GoToTop />
        <PostOwner
          avatarSrc={post.author.avatar.url}
          name={post.author.name}
          description={textFormatter(post.author.description)}
        />
        <PostHeader
          title={post.title}
          subtitle={textFormatter(post.subtitle)}
          imageSrc={post.coverImage.url}
          createdAt={post.createdAt}
          author={post.author}
          categories={post.categories}
        />
        <PostContent content={post.content} />
      </Wrapper>
    </>
  );
}
