'use client';

import { useEffect, useRef, useState } from 'react';

import { Fetcher } from 'types/fetcher';
import { FindAllPosts, Post } from 'types/findAllPosts';

import PostCard from 'components/PostCard';
import SkeletonPostList from 'components/SkeletonPostsList';

type LoadMorePostsProps = {
  isPostOwner: boolean;
  service: (page: number) => Promise<Fetcher<FindAllPosts>>;
};

export default function LoadMorePosts({
  isPostOwner,
  service,
}: LoadMorePostsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  const currentPage = useRef(1);
  const lastElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(async (entries) => {
      const isSomeIntersecting = entries.some((entry) => entry.isIntersecting);
      if (isSomeIntersecting) {
        const posts = await service(currentPage.current);

        if (posts.data._embedded) {
          setNewPosts((prev) => [...prev, ...posts.data._embedded.postsList]);
          currentPage.current = posts.data.page.number + 1;
          return;
        }
        setIsLoading(false);
      }
    });

    if (lastElementRef.current) {
      intersectionObserver.observe(lastElementRef.current);
    }

    return () => {
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
    };
  }, [service]);

  useEffect(() => {
    setIsLoading(false);
  }, [newPosts]);

  if (isLoading) {
    return <SkeletonPostList.Posts />;
  }

  return (
    <>
      {newPosts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          subtitle={post.subtitle}
          coverImage={post.coverImage}
          id={post.id}
          isPostOwner={isPostOwner}
        />
      ))}
      <div ref={lastElementRef} />
    </>
  );
}
