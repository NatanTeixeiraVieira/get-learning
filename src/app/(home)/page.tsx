import usePostsStore from 'store/posts';
import InitializerPostsStore from 'store/posts/initializerStore';
import { Post } from 'types/post';
import getDatas from 'utils/getDatas';

import PostGrid from 'components/PostGrid';

export default async function Home() {
  const posts = await getDatas<Post[]>('/posts', {
    next: { revalidate: 10 },
  });
  usePostsStore.setState({ state: { posts: posts } });

  return (
    <>
      <InitializerPostsStore posts={posts} />
      <PostGrid />
    </>
  );
}
