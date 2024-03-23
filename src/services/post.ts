import { postEndpoint } from 'constants/endpoints';
import { revalidateTimeInSeconds } from 'constants/times';
import { FindAllPosts } from 'types/findAllPosts';
import { FindPostById } from 'types/findPostById';
import { postEndpointId } from 'utils/endpoints';
import fetcher from 'utils/fetcher';

export const findAllPosts = async () => {
  const posts = await fetcher<FindAllPosts>(postEndpoint, null, {
    next: { revalidate: revalidateTimeInSeconds },
  });

  return posts;
};

export const findPostById = async (postId: string) => {
  const post = await fetcher<FindPostById>(postEndpointId(postId), null, {
    next: { revalidate: revalidateTimeInSeconds },
  });
  return post;
};

export const deletePost = async (postId: string) => {
  const endpoint = postEndpointId(postId);
  const response = await fetcher(endpoint, null, {
    next: { revalidate: revalidateTimeInSeconds },
  });
  return response;
};
