import { accountInfosSchema } from 'validations/schemas';
import { z } from 'zod';

export type AccountInfosData = z.infer<typeof accountInfosSchema>;
