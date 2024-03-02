import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { findPostById } from 'services/post';
import { textFormatter } from 'utils/textFormatter';

import { Tags, Wrapper } from './styles';

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
  const post = await findPostById(params.id);

  return {
    title: `${post.data.title} - ${post.data.author.name}`,
    description: post.data.subtitle,
  };
};

export default async function Post({ params }: PostProps) {
  const postResponse = await findPostById(params.id);
  const post = postResponse.data;
  console.log(post);

  if (!postResponse.success) {
    notFound();
  }

  return (
    <Wrapper>
      <GoToTop />
      <PostOwner
        avatarSrc={post.author.authorImage?.url}
        name={post.author.name}
        description={textFormatter(post.author.description)}
        slug={post.author.slug}
        authorId={post.author.id}
      />
      <PostHeader
        title={post.title}
        subtitle={textFormatter(post.subtitle)}
        imageSrc={post.coverImage.url}
        createdAt={post.postTime}
        categories={post.categories}
      />
      <PostContent content={post.content} />
      <Tags>
        Tags:{' '}
        {post.tags.map((tag) => (
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
      {/* <Feedback
        postId={post.postId}
        initialLikeNumber={post.like}
        initialDislikeNumber={post.dislike}
        authorId={author.authorId}
        authorLikedPosts={author.likedPosts}
        authorDislikedPosts={author.dislikedPosts}
      /> */}
    </Wrapper>
  );
}
