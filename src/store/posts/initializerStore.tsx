'use client';

import { useRef } from 'react';

import { Post } from 'types/post';

import usePostsStore from '.';

type InitializerPostsStoreProps = {
  posts: Post[];
};

const InitializerPostsStore = ({ posts }: InitializerPostsStoreProps) => {
  const initializer = useRef(false);

  if (!initializer.current) {
    usePostsStore.setState({ state: { posts } });
    initializer.current = true;
  }

  return null;
};

export default InitializerPostsStore;
