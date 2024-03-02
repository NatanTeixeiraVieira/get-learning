import { postEndpoint } from 'constants/endpoints';

export const postEndpointId = (postId: string) => {
  return `${postEndpoint}/${postId}`;
};
