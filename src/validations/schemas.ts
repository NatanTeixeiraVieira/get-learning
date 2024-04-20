import DOMPurify from 'dompurify';
import categoriesList from 'utils/categoriesList';
import { z } from 'zod';

import { emailRegEx } from './regex';

export const userName = z
  .string({ required_error: 'Este campo é obrigatório.' })
  .min(1, 'Este campo é obrigatório.')
  .min(3, 'Seu nome de usuário deve conter pelo menos 3 caracteres.')
  .trim();

export const email = z
  .string({ required_error: 'Este campo é obrigatório.' })
  .min(1, 'Este campo é obrigatório.')
  .email('Email inválido.')
  .regex(emailRegEx, 'Email inválido.');

export const password = z
  .string({ required_error: 'Este campo é obrigatório.' })
  .min(1, 'Este campo é obrigatório.')
  .min(8, 'A senha deve ter pelo menos 8 caracteres.');

export const acceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export const image = z
  .any()
  .refine((image) => image.length > 0, 'Por favor, insira uma imagem.')
  .refine(
    (files) => files?.[0]?.size <= 5_000_000,
    `O tamanho máximo da imagem deve ser 5Mb.`
  )
  .refine(
    (files) => acceptedImageTypes.includes(files?.[0]?.type),
    'Somente imagens .jpg, .jpeg e .png são permitidas.'
  );

export const registerFormSchema = z.object({
  userName,
  email,
  password,
});

export const loginFormSchema = z.object({
  email,
  password,
});

export const contentSchema = z.string().refine((content) => {
  console.log(
    DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [''],
    }).split(/\s+/).length
  );
  return (
    DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [''],
    }).split(/\s+/).length >= 3
  );
}, 'Pouco conteúdo. Por favor, escreva mais.');

export const makePostFormSchema = z.object({
  title: z
    .string({ required_error: 'Este campo é obrigatório.' })
    .min(1, 'Este campo é obrigatório.')
    .min(3, 'O título deve conter pelo menos 3 caracteres.'),
  subtitle: z
    .string({ required_error: 'Este campo é obrigatório.' })
    .min(1, 'Este campo é obrigatório.')
    .min(3, 'O subtítulo deve conter pelo menos 3 caracteres.'),
  category: z
    .string({ required_error: 'Este campo é obrigatório.' })
    .refine(
      (category) => categoriesList.includes(category),
      'Por favor, selecione uma categoria.'
    ),
  allowComents: z.boolean(),
  coverImage: image,
});

export const accountInfosSchema = z.object({
  name: userName,
  description: z.string().trim().optional(),
});
