import { LoadingContainer, Image, Post, PostText, PostsList } from './styles';

export default function SkeletonPostsList() {
  return (
    <LoadingContainer>
      <PostsList>
        {[...Array(24)].map((_, index) => (
          <Post key={index}>
            <Image />
            <PostText height={1.5} />
            <PostText height={1} />
          </Post>
        ))}
      </PostsList>
    </LoadingContainer>
  );
}
