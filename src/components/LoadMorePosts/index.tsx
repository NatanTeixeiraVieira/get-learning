'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import usePostsStore from 'store/posts';
import { Post } from 'types/post';
import { loadMorePosts } from 'utils/firestore';

import PostCard from 'components/PostCard';
import SkeletonPostList from 'components/SkeletonPostsList';

export default function LoadMorePosts() {
  const [isLoading, setIsLoading] = useState(false);
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  const {
    state: { posts },
  } = usePostsStore();
  const startAfter = useRef(posts.at(-1)?.createdAt);

  const handleLoadMorePosts = useCallback(async () => {
    const scrollPositionAllowRequest = window.scrollY * 2 + window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    if (scrollPositionAllowRequest >= documentHeight) {
      setIsLoading(true);
      const morePosts = await loadMorePosts(startAfter.current);
      startAfter.current = morePosts?.at(-1)?.createdAt;
      if (!morePosts) {
        setIsLoading(false);
        return;
      }
      setNewPosts(morePosts);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleLoadMorePosts);

    return () => {
      window.removeEventListener('scroll', handleLoadMorePosts);
    };
  }, [handleLoadMorePosts]);

  if (isLoading) {
    return <SkeletonPostList.Posts />;
  }

  return (
    <>
      {newPosts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          subtitle={post.subtitle}
          imageSrc={post.coverImage.url}
          id={post.id}
        />
      ))}
    </>
  );
}
