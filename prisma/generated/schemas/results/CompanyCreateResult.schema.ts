import { z } from 'zod';
export const CompanyCreateResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  users: z.array(z.unknown()),
  products: z.array(z.unknown())
});