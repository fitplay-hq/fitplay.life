import { z } from 'zod';
export const AdminUpsertResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
});