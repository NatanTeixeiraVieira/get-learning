'use client';

import { useRef } from 'react';

import { Post } from 'types/findAllPosts';

import { usePostsStore } from '.';

type PostsStoreInitializerProps = {
  posts: Post[];
};

export default function PostsStoreInitializer({
  posts,
}: PostsStoreInitializerProps) {
  const initializer = useRef(false);

  if (!initializer.current) {
    usePostsStore.setState({ state: { posts } });
    initializer.current = true;
  }

  return null;
}
