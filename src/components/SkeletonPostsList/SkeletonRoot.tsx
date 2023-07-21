import { ReactNode } from 'react';

import { LoadingContainer, PostsList } from './styles';

type SkeletonPostsListRootProps = {
  children: ReactNode;
};

export default function SkeletonPostsListRoot({
  children,
}: SkeletonPostsListRootProps) {
  return (
    <LoadingContainer>
      <PostsList>{children}</PostsList>
    </LoadingContainer>
  );
}
