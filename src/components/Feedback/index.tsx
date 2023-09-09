'use client';

import { useEffect, useState } from 'react';

import { feedback } from 'constants/localStorageKeys';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Author } from 'types/author';
import { MarkedFeedback, InfosToSaveFeedback } from 'types/feedback';
import { Post } from 'types/post';

import { Wrapper, Dislike, Like } from './styles';

type FeedbackProps = {
  postId: Post['postId'];
  initialLikeNumber: Post['like'];
  initialDislikeNumber: Post['dislike'];
  authorId: Author['authorId'];
  authorLikedPosts: Author['likedPosts'];
  authorDislikedPosts: Author['dislikedPosts'];
};

export default function Feedback({
  postId,
  initialLikeNumber = 0,
  initialDislikeNumber = 0,
  authorId,
  authorLikedPosts,
  authorDislikedPosts,
}: FeedbackProps) {
  const [markedFeedback, setMarkedFeedback] = useState<MarkedFeedback>(() => {
    if (authorLikedPosts?.includes(postId)) return 'like';
    if (authorDislikedPosts?.includes(postId)) return 'dislike';
    return null;
  });
  const [likeNumber, setLikeNumberState] = useState(initialLikeNumber);
  const [dislikeNumber, setDislikeNumberState] = useState(initialDislikeNumber);

  useEffect(() => {
    let increment: InfosToSaveFeedback['increment'] = null;
    let decrement: InfosToSaveFeedback['decrement'] = null;

    if (
      likeNumber > initialLikeNumber &&
      dislikeNumber === initialDislikeNumber
    ) {
      increment = 'like';
      decrement = null;
      saveInLocalStorage({ postId, authorId, increment, decrement });
    } else if (
      dislikeNumber > initialDislikeNumber &&
      likeNumber === initialLikeNumber
    ) {
      increment = 'dislike';
      decrement = null;
      saveInLocalStorage({ postId, authorId, increment, decrement });
    } else if (
      likeNumber > initialLikeNumber &&
      dislikeNumber < initialDislikeNumber
    ) {
      increment = 'like';
      decrement = 'dislike';
      saveInLocalStorage({ postId, authorId, increment, decrement });
    } else if (
      dislikeNumber > initialDislikeNumber &&
      likeNumber < initialLikeNumber
    ) {
      increment = 'dislike';
      decrement = 'like';
      saveInLocalStorage({ postId, authorId, increment, decrement });
    } else if (
      likeNumber < initialLikeNumber &&
      dislikeNumber === initialDislikeNumber
    ) {
      increment = null;
      decrement = 'like';
      saveInLocalStorage({ postId, authorId, increment, decrement });
    } else if (
      dislikeNumber < initialDislikeNumber &&
      likeNumber === initialLikeNumber
    ) {
      increment = null;
      decrement = 'dislike';
      saveInLocalStorage({ postId, authorId, increment, decrement });
    } else if (
      dislikeNumber === initialDislikeNumber &&
      likeNumber === initialLikeNumber
    ) {
      localStorage.removeItem(feedback);
    }
  }, [
    dislikeNumber,
    likeNumber,
    initialDislikeNumber,
    initialLikeNumber,
    postId,
    authorId,
  ]);

  const saveInLocalStorage = (infosToSaveFeedback: InfosToSaveFeedback) => {
    localStorage.setItem(feedback, JSON.stringify(infosToSaveFeedback));
  };

  const handleMarkLike = () => {
    if (markedFeedback === 'like') {
      setMarkedFeedback(null);
      setLikeNumberState((prev) => (prev -= 1));
      return;
    }
    if (markedFeedback === 'dislike') {
      setDislikeNumberState((prev) => (prev -= 1));
    }
    setMarkedFeedback('like');
    setLikeNumberState((prev) => (prev += 1));
  };

  const handleMarkDislike = () => {
    if (markedFeedback === 'dislike') {
      setMarkedFeedback(null);
      setDislikeNumberState((prev) => (prev -= 1));
      return;
    }
    if (markedFeedback === 'like') {
      setLikeNumberState((prev) => (prev -= 1));
    }
    setMarkedFeedback('dislike');
    setDislikeNumberState((prev) => (prev += 1));
  };

  return (
    <Wrapper>
      <Like onClick={handleMarkLike}>
        <ThumbsUp fill={markedFeedback === 'like' ? 'black' : 'white'} />
        {likeNumber}
      </Like>
      <Dislike onClick={handleMarkDislike}>
        <ThumbsDown fill={markedFeedback === 'dislike' ? 'black' : 'white'} />
        {dislikeNumber}
      </Dislike>
    </Wrapper>
  );
}
