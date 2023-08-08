import InitializerEndpointStore from 'store/endpointGetPosts/initializerStore';
import usePostsStore from 'store/posts';
import InitializerPostsStore from 'store/posts/initializerStore';
import { Post } from 'types/post';
import fetcher from 'utils/fetcher';

import PostGrid from 'components/PostGrid';

export default async function Home() {
  const endpoint = '/posts';
  const posts = await fetcher<Post[]>(endpoint, {
    next: { revalidate: 10 },
  });
  if (!posts.datas) {
    return <div>Sem posts</div>;
  }
  usePostsStore.setState({ state: { posts: posts.datas } });

  return (
    <>
      <InitializerPostsStore posts={posts.datas} />
      <InitializerEndpointStore endpoint={endpoint} />
      <PostGrid />
    </>
  );
}
