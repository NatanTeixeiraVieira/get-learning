import usePostsStore from 'store/posts';
import InitializerPostsStore from 'store/posts/initializerStore';
import { Post } from 'types/post';
import getDatas from 'utils/getDatas';

import PostGrid from 'components/PostGrid';

export default async function Home() {
  let posts: Post[] = [];
  try {
    posts = await getDatas<Post[]>('/posts', {
      next: { revalidate: 10 },
    });
    usePostsStore.setState({ state: { posts: posts } });
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
      <InitializerPostsStore posts={posts} />
      <PostGrid />
    </>
  );
}
