import { postEndpoint } from 'constants/endpoints';
import { revalidateTimeInSeconds } from 'constants/requestConfigs';
import { FindAllPosts } from 'types/FindAllPosts';
import { FindPostById } from 'types/FindPostById';
import { postEndpointId } from 'utils/endpoints';
import fetcher from 'utils/fetcher';

export const findAllPosts = async () => {
  const posts = await fetcher<FindAllPosts>(postEndpoint, {
    next: { revalidate: revalidateTimeInSeconds },
  });

  return posts;
};

export const findPostById = async (postId: string) => {
  const post = await fetcher<FindPostById>(postEndpointId(postId));
  return post;
};

export const deletePost = async (postId: string) => {
  const endpoint = postEndpointId(postId);
  const response = await fetcher(endpoint);
  return response;
};
