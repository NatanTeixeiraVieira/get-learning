import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Author } from 'types/author';
import { Post } from 'types/post';
import fetcher from 'utils/fetcher';
import { textFormatter } from 'utils/textFormatter';

import { Tags, Wrapper } from './styles';

import Feedback from 'components/Feedback';
import GoToTop from 'components/GoToTop';
import PostContent from 'components/PostContent';
import PostHeader from 'components/PostHeader';
import PostOwner from 'components/PostOwner';

type PostProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params,
}: PostProps): Promise<Metadata> => {
  try {
    const post = await fetcher<Post>(`/post/${params.id}`, {
      next: { revalidate: 10 },
    });
    const author = await fetcher<Author>(`/author/id/${post.datas.authorId}`, {
      next: { revalidate: 10 },
    });
    return {
      title: `${post.datas.title} - ${author.datas.name}`,
      description: post.datas.excerpt,
    };
  } catch (err) {
    return {
      title: 'Página não encontrada',
    };
  }
};

export default async function Post({ params }: PostProps) {
  const post = await fetcher<Post>(`/post/${params.id}`, {
    cache: 'no-store',
  });
  if (!post.ok) {
    notFound();
  }

  const author = await fetcher<Author>(`/author/id/${post.datas.authorId}`, {
    cache: 'no-store',
  });

  if (!author.ok) {
    throw new Error('Algo deu errado. Por favor tente novamente mais tarde.');
  }

  return (
    <Wrapper>
      <GoToTop />
      <PostOwner
        avatarSrc={author.datas.avatar?.url}
        name={author.datas.name}
        description={textFormatter(author.datas.description)}
        slug={author.datas.slug}
        authorId={author.datas.authorId}
      />
      <PostHeader
        title={post.datas.title}
        subtitle={textFormatter(post.datas.excerpt)}
        imageSrc={post.datas.coverImage.url}
        createdAt={post.datas.createdAt}
        category={post.datas.category}
      />
      <PostContent content={post.datas.content} />
      <Tags>
        Tags:{' '}
        {post.datas.tags.map((tag) => (
          <Link
            href={{
              pathname: `/tag/${tag.slug}`,
              query: {
                name: tag.name,
              },
            }}
            key={`tags-${tag.slug}`}
          >
            {tag.name}
          </Link>
        ))}
      </Tags>
      <Feedback
        postId={post.datas.postId}
        initialLikeNumber={post.datas.like}
        initialDislikeNumber={post.datas.dislike}
        authorId={author.datas.authorId}
        authorLikedPosts={author.datas.likedPosts}
        authorDislikedPosts={author.datas.dislikedPosts}
      />
    </Wrapper>
  );
}
