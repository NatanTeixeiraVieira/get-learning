import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import InitializerPostsStore from 'store/posts/initializerStore';
import { Post } from 'types/post';
import getDatas from 'utils/getDatas';
import { textFormatter } from 'utils/textFormatter';

import PostGrid from 'components/PostGrid';
import PostOwner from 'components/PostOwner';

import { Wrapper } from './style';

export const generateMetadata = async ({
  params,
}: AuthorProps): Promise<Metadata> => {
  try {
    const authorPosts = await getDatas<Post[]>(
      `/posts/author/${params.authorId}`,
      {
        next: { revalidate: 10 },
      }
    );
    return {
      title: `${authorPosts[0].author.name}`,
      description: authorPosts[0].author.description,
    };
  } catch (err) {
    return {
      title: 'Página não encontrada',
    };
  }
};

type AuthorProps = {
  params: {
    authorSlug: string;
    authorId: string;
  };
};

export default async function Author({ params }: AuthorProps) {
  const authorPosts = await getDatas<Post[]>(
    `/posts/author/${params.authorId}`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!authorPosts[0]) {
    notFound();
  }

  return (
    <Wrapper>
      <InitializerPostsStore posts={authorPosts} />
      <PostOwner
        avatarSrc={authorPosts[0].author.avatar.url}
        name={authorPosts[0].author.name}
        description={textFormatter(authorPosts[0].author.description)}
        slug={authorPosts[0].author.slug}
        authorId={authorPosts[0].author.id}
      />
      <PostGrid />
    </Wrapper>
  );
}
