import { Post } from 'types/post';
import getDatas from 'utils/getDatas';

import { PostGrid } from './styles';

import PostCard from 'components/PostCard';

export default async function Home() {
  let posts: Post[] | null = null;
  try {
    posts = await getDatas<Post[]>('/posts', {
      next: {
        revalidate: 5,
      },
    });
  } catch (err) {
    return (
      <div>
        <p>Falha ao carregar os posts</p>
        {err instanceof Error && <p>{err.message}</p>}
      </div>
    );
  }

  return (
    <>
      <PostGrid>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            slug={post.slug}
            title={post.title}
            subtitle={post.subtitle}
            imageSrc={post.coverImage.url}
          />
        ))}
      </PostGrid>
    </>
  );
}
