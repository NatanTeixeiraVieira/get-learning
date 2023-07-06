import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Post } from 'types/post';
import getDatas from 'utils/getDatas';
import { textFormatter } from 'utils/textFormatter';

import { Tags, Wrapper } from './styles';

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

type PostProps = {
  params: {
    id: string;
  };
};

export default async function Post({ params }: PostProps) {
  const post = await getDatas<Post>(`/post/${params.id}`, {
    next: { revalidate: 10 },
  });
  if (!post.title) {
    notFound();
  }

  return (
    <Wrapper>
      <GoToTop />
      <PostOwner
        avatarSrc={post.author.avatar.url}
        name={post.author.name}
        description={textFormatter(post.author.description)}
        slug={post.author.slug}
        authorId={post.author.id}
      />
      <PostHeader
        title={post.title}
        subtitle={textFormatter(post.subtitle)}
        imageSrc={post.coverImage.url}
        createdAt={post.createdAt}
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
    </Wrapper>
  );
}
