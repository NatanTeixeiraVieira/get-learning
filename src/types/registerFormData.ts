import { registerFormSchema } from 'validations/schemas';
import { z } from 'zod';

export type RegisterData = z.infer<typeof registerFormSchema>;
