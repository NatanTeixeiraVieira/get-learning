import { Author } from './author';
import { Post } from './post';

export type MarkedFeedback = 'like' | 'dislike' | null;

export type InfosToSaveFeedback = {
  authorId: Author['authorId'];
  postId: Post['postId'];
  increment: MarkedFeedback;
  decrement: MarkedFeedback;
};
