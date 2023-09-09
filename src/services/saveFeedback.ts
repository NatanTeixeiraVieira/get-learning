import { feedback } from 'constants/localStorageKeys';
import { InfosToSaveFeedback } from 'types/feedback';
import fetcher from 'utils/fetcher';

export const saveFeedback = async (
  InfosToSaveFeedback?: InfosToSaveFeedback
) => {
  const incrementAndDecrementInUrl = `${
    InfosToSaveFeedback?.increment
      ? `&increment=${InfosToSaveFeedback?.increment}`
      : ''
  }${
    InfosToSaveFeedback?.decrement
      ? `&decrement=${InfosToSaveFeedback?.decrement}`
      : ''
  }`;

  const response = await fetcher<{ message: string }>(
    `/feedback?authorId=${InfosToSaveFeedback?.authorId}&postId=${InfosToSaveFeedback?.postId}${incrementAndDecrementInUrl}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  console.log(response);

  if (response.ok) {
    localStorage.removeItem(feedback);
  }
};
