import SkeletonPostsList from 'components/SkeletonPostsList';

export default function loading() {
  return (
    <SkeletonPostsList.Root>
      <SkeletonPostsList.Posts />
    </SkeletonPostsList.Root>
  );
}
