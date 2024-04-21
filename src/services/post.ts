import { tokenKey } from 'constants/cookiesKeys';
import { postEndpoint } from 'constants/endpoints';
import { methodPost } from 'constants/request';
import { revalidateTimeInSeconds } from 'constants/times';
import { parseCookies } from 'nookies';
import { FindAllPosts } from 'types/findAllPosts';
import { FindPostById } from 'types/findPostById';
import { SavePost } from 'types/savePost';
import {
  categoryPostsEndpoint,
  postEndpointId,
  postsByAuthorIdEndpoint,
  tagPostsEndpoint,
} from 'utils/endpoints';
import fetcher from 'utils/fetcher';
import generatePaginatedUrl from 'utils/generatePaginatedUrl';

export const findAllPosts = async (
  page?: number,
  limit?: number,
  direction?: 'asc' | 'desc'
) => {
  const url = generatePaginatedUrl(postEndpoint, page, limit, direction);

  const posts = await fetcher<FindAllPosts>(url, null, {
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

export const findAllPostsByAuthorId = async (
  authorId: string,
  page?: number,
  limit?: number,
  direction?: 'asc' | 'desc'
) => {
  const url = generatePaginatedUrl(
    postsByAuthorIdEndpoint(authorId),
    page,
    limit,
    direction
  );

  const posts = await fetcher<FindAllPosts>(url, null, {
    next: { revalidate: revalidateTimeInSeconds },
  });

  return posts;
};

export const findAllPostsByCategorySlug = async (
  categorySlug: string,
  page?: number,
  limit?: number,
  direction?: 'asc' | 'desc'
) => {
  const url = generatePaginatedUrl(
    categoryPostsEndpoint(categorySlug),
    page,
    limit,
    direction
  );

  const posts = await fetcher<FindAllPosts>(url, null, {
    next: { revalidate: revalidateTimeInSeconds },
  });

  return posts;
};

export const findAllPostsByTagSlug = async (
  tagSlug: string,
  page?: number,
  limit?: number,
  direction?: 'asc' | 'desc'
) => {
  const url = generatePaginatedUrl(
    tagPostsEndpoint(tagSlug),
    page,
    limit,
    direction
  );

  const posts = await fetcher<FindAllPosts>(url, null, {
    next: { revalidate: revalidateTimeInSeconds },
  });

  return posts;
};

export const savePost = async (
  title: string,
  subtitle: string,
  content: string,
  allowComments: boolean,
  categories: string[],
  tags: string[],
  coverImage: FileList
) => {
  const postData = {
    title,
    subtitle,
    content,
    allowComments,
    categories,
    tags,
  };

  const formData = new FormData();
  formData.append('coverImageFile', coverImage[0]);
  formData.append('dto', JSON.stringify(postData));
  const token = parseCookies()[tokenKey];

  const response = await fetcher<SavePost>(postEndpoint, formData, {
    method: methodPost,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deletePost = async (postId: string) => {
  const endpoint = postEndpointId(postId);
  const response = await fetcher(endpoint, null, {
    next: { revalidate: revalidateTimeInSeconds },
  });
  return response;
};
