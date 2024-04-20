import { postsPerRequest } from 'constants/request';

import { Image, PostText, Post } from './styles';

export default function SkeletonPosts() {
  return (
    <>
      {[...Array(postsPerRequest)].map((_, index) => (
        <Post key={index}>
          <Image />
          <PostText height={1.5} />
          <PostText height={1} />
        </Post>
      ))}
    </>
  );
}
