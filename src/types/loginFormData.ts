import { loginFormSchema } from 'validations/schemas';
import { z } from 'zod';

export type LoginFormData = z.infer<typeof loginFormSchema>;
