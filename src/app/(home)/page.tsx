import { findAllPosts } from 'services/post';

import PostGrid from 'components/PostGrid';

export default async function Home() {
  const posts = await findAllPosts();
  console.log(posts);

  if (!posts.data) {
    return <div>Sem posts</div>;
  }

  return (
    <>
      <PostGrid posts={posts.data._embedded.postsList} />
    </>
  );
}
