'use client';

import { useCallback, useEffect, useState } from 'react';

import usePostsStore from 'store/posts';
import { Post } from 'types/post';
import getDatas from 'utils/getDatas';

import { EndOfPosts } from './styles';

import Heading from 'components/Heading';
import SkeletonPostsList from 'components/SkeletonPostsList';

export default function LoadMorePosts() {
  const [postsEnd, setPostsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    actions: { addPosts },
  } = usePostsStore();

  const handleLoadMorePosts = useCallback(async () => {
    const scrollPositionAllowRequest = window.scrollY * 2 + window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    if (scrollPositionAllowRequest >= documentHeight && !postsEnd) {
      try {
        setIsLoading(true);
        const newPosts = await getDatas<Post[]>('/loadMorePosts');
        addPosts(newPosts);
      } catch (err) {
        setPostsEnd(true);
      } finally {
        setIsLoading(false);
      }
    }
  }, [addPosts, postsEnd]);

  useEffect(() => {
    window.addEventListener('scroll', handleLoadMorePosts);

    return () => {
      window.removeEventListener('scroll', handleLoadMorePosts);
    };
  }, [handleLoadMorePosts]);

  if (isLoading && !postsEnd) {
    return <SkeletonPostsList />;
  }

  return (
    <EndOfPosts>
      <Heading as="h3" size="small">
        {postsEnd && 'Os posts acabaram'}
      </Heading>
    </EndOfPosts>
  );
}
