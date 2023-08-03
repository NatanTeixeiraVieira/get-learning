import usePostsStore from 'store/posts';
import InitializerPostsStore from 'store/posts/initializerStore';
import { Post } from 'types/post';
import fetcher from 'utils/fetcher';

import PostGrid from 'components/PostGrid';

export default async function Home() {
  const posts = await fetcher<Post[]>('/posts', {
    next: { revalidate: 10 },
  });
  if (!posts.datas) {
    return <div>Sem posts</div>;
  }
  usePostsStore.setState({ state: { posts: posts.datas } });

  return (
    <>
      <InitializerPostsStore posts={posts.datas} />
      <PostGrid />
    </>
  );
}
