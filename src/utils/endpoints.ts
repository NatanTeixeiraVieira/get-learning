import { authorEndpoint, postEndpoint } from 'constants/endpoints';

export const postEndpointId = (postId: string) => `${postEndpoint}/${postId}`;

export const authorEndpointId = (authorId: string) =>
  `${authorEndpoint}/${authorId}`;

export const postsByAuthorIdEndpoint = (authorId: string) =>
  `${postEndpoint}/authorId/${authorId}`;

export const categoryPostsEndpoint = (categorySlug: string) =>
  `${postEndpoint}/category/${categorySlug}`;
