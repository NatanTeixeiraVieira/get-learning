import { registerFormSchema } from 'utils/validations';
import { z } from 'zod';

export type RegisterDatas = z.infer<typeof registerFormSchema>;
