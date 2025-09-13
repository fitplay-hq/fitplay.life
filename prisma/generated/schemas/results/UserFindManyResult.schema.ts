import { z } from 'zod';
export const UserFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});