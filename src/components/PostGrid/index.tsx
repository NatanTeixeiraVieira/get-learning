'use client';

import usePostsStore from 'store/posts';

import { Wrapper } from './styles';

import LoadMorePosts from 'components/LoadMorePosts';
import PostCard from 'components/PostCard';

export default function PostGrid() {
  const {
    state: { posts },
  } = usePostsStore();

  return (
    <>
      <Wrapper>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            subtitle={post.subtitle}
            imageSrc={post.coverImage.url}
            id={post.id}
          />
        ))}
      </Wrapper>
      <LoadMorePosts />
    </>
  );
}
