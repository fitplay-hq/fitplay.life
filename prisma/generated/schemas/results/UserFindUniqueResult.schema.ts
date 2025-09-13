import { z } from 'zod';
export const UserFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  role: z.unknown(),
  gender: z.unknown().optional(),
  birthDate: z.date().optional(),
  company: z.unknown(),
  companyId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  verified: z.boolean()
}));