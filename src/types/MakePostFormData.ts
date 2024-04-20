import { makePostFormSchema } from 'validations/schemas';
import { z } from 'zod';

export type MakePostFormSchema = z.infer<typeof makePostFormSchema>;

export type MakePostFormData = Omit<MakePostFormSchema, 'coverImage'> & {
  coverImage: FileList;
};
