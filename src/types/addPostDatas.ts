import { makePostFormSchema } from 'utils/validations';
import { z } from 'zod';

export type MakePostData = z.infer<typeof makePostFormSchema>;
