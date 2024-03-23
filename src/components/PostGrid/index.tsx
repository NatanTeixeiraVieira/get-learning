import { Post } from 'types/findAllPosts';

import { Wrapper } from './styles';

import LoadMorePosts from 'components/LoadMorePosts';
import PostCard from 'components/PostCard';

type PostGridProps = {
  posts: Post[];
};

export default function PostGrid({ posts }: PostGridProps) {
  return (
    <Wrapper>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          subtitle={post.subtitle}
          coverImage={post.coverImage}
          id={post.id}
          isPostOwner={false}
        />
      ))}
      {/* <LoadMorePosts isPostOwner={false} /> */}
    </Wrapper>
  );
}
