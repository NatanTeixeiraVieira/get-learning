import { z } from 'zod';

const emailRegEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const userName = z
  .string()
  .nonempty('Esse campo é obrigatório.')
  .min(3, 'Seu nome de usuário deve conter pelo menos 3 caracteres.')
  .trim();

export const email = z
  .string()
  .nonempty('Esse campo é obrigatório.')
  .email('Email inválido.')
  .regex(emailRegEx, 'Email inválido.');

export const password = z
  .string()
  .nonempty('Esse campo é obrigatório.')
  .min(6, 'A senha deve ter entre 6 e 60 caracteres.')
  .max(60, 'A senha deve ter entre 6 e 60 caracteres.');
