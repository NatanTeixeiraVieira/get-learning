'use client';

import { useEffect, useState } from 'react';

import usePostsStore from 'store/posts';
import { Post } from 'types/post';
import getDatas from 'utils/getDatas';

import { EndOfPosts } from './styles';

import Heading from 'components/Heading';

export default function LoadMorePosts() {
  const [postsEnd, setPostsEnd] = useState(false);
  const {
    actions: { addPosts },
  } = usePostsStore();

  useEffect(() => {
    const handleLoadMorePosts = async () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      if (scrollPosition >= documentHeight) {
        try {
          const newPosts = await getDatas<Post[]>('/loadMorePosts');
          addPosts(newPosts);
        } catch (err) {
          setPostsEnd(true);
        }
      }
    };
    window.addEventListener('scroll', handleLoadMorePosts);

    return () => {
      window.removeEventListener('scroll', handleLoadMorePosts);
    };
  }, [addPosts]);

  if (!postsEnd) {
    return null;
  }
  return (
    <EndOfPosts>
      <Heading as="h3" size="medium">
        Os posts acabaram
      </Heading>
    </EndOfPosts>
  );
}
