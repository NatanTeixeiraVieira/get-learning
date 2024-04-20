import {
  loginEndpoint,
  registerConfirmEmailEndpoint,
  registerSendEmailEndpoint,
} from 'constants/endpoints';
import { contentTypeJson, methodPost } from 'constants/request';
import { Login } from 'types/login';
import { RegisterSendEmailVerification } from 'types/registerSendEmail';
import fetcher from 'utils/fetcher';

export const registerSendEmailVerification = async (
  login: string,
  password: string,
  userName: string
) => {
  const body = {
    login,
    password,
    userName,
  };
  const response = await fetcher<RegisterSendEmailVerification>(
    registerSendEmailEndpoint,
    body,
    { method: methodPost, headers: { 'Content-Type': contentTypeJson } }
  );
  return response;
};

export const registerConfirmEmail = async (
  tokenEmailConfirmation: string | null,
  emailId?: string
) => {
  if (emailId && tokenEmailConfirmation) {
    const response = await fetcher<Login>(
      registerConfirmEmailEndpoint,
      { emailId },
      {
        method: methodPost,

        headers: {
          Authorization: tokenEmailConfirmation,
          'Content-Type': contentTypeJson,
        },
      }
    );
    return response;
  }

  throw new Error('invalid data');
};

export const login = async (login: string, password: string) => {
  if (login && password) {
    const response = await fetcher<Login>(
      loginEndpoint,
      { login, password },
      {
        method: methodPost,
      }
    );

    return response;
  }

  throw new Error('invalid data');
};
