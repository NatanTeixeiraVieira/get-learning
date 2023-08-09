import fetcher from 'utils/fetcher';

export const deletePost = async (postId: string, coverImageName: string) => {
  const responseDeletePost = await fetcher<{ message: string }>(
    `/post/${postId}?coverImage=${coverImageName}`,
    {
      method: 'DELETE',
    }
  );

  return responseDeletePost;
};
