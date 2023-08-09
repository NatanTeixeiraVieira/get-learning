import usePostsStore from 'store/posts';

import { Wrapper } from './styles';

import LoadMorePosts from 'components/LoadMorePosts';
import PostCard from 'components/PostCard';

export default function PostGrid({ isPostOwner = false }) {
  const { posts } = usePostsStore.getState().state;
  return (
    <Wrapper>
      {posts.map((post) => (
        <PostCard
          key={post.postId}
          title={post.title}
          subtitle={post.excerpt}
          coverImage={post.coverImage}
          id={post.postId}
          isPostOwner={isPostOwner}
        />
      ))}
      <LoadMorePosts isPostOwner={isPostOwner} />
    </Wrapper>
  );
}
