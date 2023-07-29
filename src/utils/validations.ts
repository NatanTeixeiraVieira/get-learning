import DOMPurify from 'dompurify';
import { z } from 'zod';

import categoriesList from './categoriesList';

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

export const acceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export const makePostFormSchema = z.object({
  title: z
    .string()
    .nonempty('Este campo é obrigatório.')
    .min(3, 'O título deve conter pelo menos 3 caracteres.'),
  excerpt: z
    .string()
    .nonempty('Este campo é obrigatório.')
    .min(3, 'O subtítulo deve conter pelo menos 3 caracteres.'),
  category: z
    .string()
    .refine(
      (category) => categoriesList.includes(category),
      'Selecione uma categoria.'
    ),
  allowComents: z.boolean(),
  coverImage: z
    .any()
    .refine((image) => image.length > 0, 'Por favor, insira uma imagem.')
    .refine(
      (files) => files?.[0]?.size <= 5_000_000,
      `O tamanho máximo da imagem deve ser 5Mb.`
    )
    .refine(
      (files) => acceptedImageTypes.includes(files?.[0]?.type),
      'Somente imagens .jpg, .jpeg e .png são permitidas.'
    ),
});

export const textEditorSchema = z.string().refine(
  (content) =>
    DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [''],
    }).split(/\s+/).length >= 3,
  'Pouco conteúdo. Por favor, escreva mais.'
);
