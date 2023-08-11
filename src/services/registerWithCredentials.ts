import fetcher from 'utils/fetcher';

const registerWithCredentials = async (
  userName: string,
  email: string,
  password: string
) => {
  const response = await fetcher<{ message: string }>('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName,
      email,
      password,
    }),
  });
  return response;
};

export default registerWithCredentials;
