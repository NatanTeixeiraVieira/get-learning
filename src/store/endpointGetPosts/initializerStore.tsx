'use client';

import { useRef } from 'react';

import useEndpointStore from '.';

type InitializerEndpointStoreProps = {
  endpoint: string;
};

const InitializerEndpointStore = ({
  endpoint,
}: InitializerEndpointStoreProps) => {
  const initializer = useRef(false);

  if (!initializer.current) {
    useEndpointStore.setState({ state: { endpoint } });
    initializer.current = true;
  }

  return null;
};

export default InitializerEndpointStore;
