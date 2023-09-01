import { accountInfosSchema } from 'utils/validations';
import { z } from 'zod';

export type AccountInfosDatas = z.infer<typeof accountInfosSchema>;
