import { z } from 'zod';
export const VerificationTokenFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
  createdAt: z.date()
}));