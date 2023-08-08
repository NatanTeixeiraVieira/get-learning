'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { postsPerRequest } from 'constants/api';
import useEndpointStore from 'store/endpointGetPosts';
import usePostsStore from 'store/posts';
import { Post } from 'types/post';
import fetcher from 'utils/fetcher';

import PostCard from 'components/PostCard';
import SkeletonPostList from 'components/SkeletonPostsList';

type LoadMorePostsProps = {
  isPostOwner: boolean;
};

export default function LoadMorePosts({ isPostOwner }: LoadMorePostsProps) {
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  const {
    state: { posts },
  } = usePostsStore();
  const {
    state: { endpoint },
  } = useEndpointStore();
  const startAfter = useRef(
    posts.length === postsPerRequest ? posts.at(-1)?.createdAt : null
  );

  const handleLoadMorePosts = useCallback(async () => {
    const scrollPositionAllowRequest = window.scrollY * 2 + window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    if (scrollPositionAllowRequest >= documentHeight && startAfter.current) {
      const endpointLoadMorePosts = `${endpoint}${
        endpoint.includes('?') ? '&' : '?'
      }startAfter=${startAfter.current}`;

      const morePosts = await fetcher<Post[]>(endpointLoadMorePosts);
      setNewPosts(morePosts.datas);
      if (morePosts.datas.length < postsPerRequest) {
        startAfter.current = null;
        return;
      }
      startAfter.current = morePosts?.datas?.at(-1)?.createdAt;
    }
  }, [endpoint]);

  useEffect(() => {
    window.addEventListener('scroll', handleLoadMorePosts);

    return () => {
      window.removeEventListener('scroll', handleLoadMorePosts);
    };
  }, [handleLoadMorePosts]);

  if (newPosts.length === 0 && startAfter.current) {
    return <SkeletonPostList.Posts />;
  }

  return (
    <>
      {newPosts.map((post) => (
        <PostCard
          key={post.postId}
          title={post.title}
          subtitle={post.excerpt}
          coverImage={post.coverImage}
          id={post.postId}
          isPostOwner={isPostOwner}
        />
      ))}
    </>
  );
}
