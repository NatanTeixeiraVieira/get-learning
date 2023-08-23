import { loginFormSchema } from 'utils/validations';
import { z } from 'zod';

export type LoginDatas = z.infer<typeof loginFormSchema>;
