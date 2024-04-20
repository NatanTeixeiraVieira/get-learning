import { findAllPosts } from 'services/post';

import LoadMorePosts from 'components/LoadMorePosts';
import PostGrid from 'components/PostGrid';

export default async function Home() {
  const posts = await findAllPosts();

  if (!posts.data) {
    return <div>Sem posts</div>;
  }

  const handleLoadMorePost = async (page: number) => {
    'use server';

    return findAllPosts(page);
  };

  return (
    <>
      <PostGrid
        posts={posts.data._embedded.postsList}
        loadMorePosts={
          <LoadMorePosts isPostOwner={false} service={handleLoadMorePost} />
        }
      />
    </>
  );
}
