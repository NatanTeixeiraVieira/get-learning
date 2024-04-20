import { ReactNode } from 'react';

import { Post } from 'types/findAllPosts';

import { Wrapper } from './styles';

import PostCard from 'components/PostCard';

type PostGridProps = {
  posts: Post[];
  isPostOwner?: boolean;
  loadMorePosts?: ReactNode;
};

export default function PostGrid({
  posts,
  isPostOwner = false,
  loadMorePosts,
}: PostGridProps) {
  return (
    <Wrapper>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          subtitle={post.subtitle}
          coverImage={post.coverImage}
          id={post.id}
          isPostOwner={isPostOwner}
        />
      ))}
      {loadMorePosts}
    </Wrapper>
  );
}
