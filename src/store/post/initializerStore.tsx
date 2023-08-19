'use client';

import { useRef } from 'react';

import { Post } from 'types/post';

import useEndpointStore from '.';

type InitializerPostStoreProps = {
  post: Post;
};

const InitializerPostStore = ({ post }: InitializerPostStoreProps) => {
  const initializer = useRef(false);

  if (!initializer.current) {
    useEndpointStore.setState({ state: { post } });
    initializer.current = true;
  }

  return null;
};

export default InitializerPostStore;
