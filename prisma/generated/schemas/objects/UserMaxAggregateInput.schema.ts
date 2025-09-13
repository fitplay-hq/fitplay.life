import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional().nullable(),
  name: z.literal(true).optional().nullable(),
  email: z.literal(true).optional().nullable(),
  password: z.literal(true).optional().nullable(),
  phone: z.literal(true).optional().nullable(),
  role: z.literal(true).optional().nullable(),
  gender: z.literal(true).optional().nullable(),
  birthDate: z.literal(true).optional().nullable(),
  companyId: z.literal(true).optional().nullable(),
  createdAt: z.literal(true).optional().nullable(),
  updatedAt: z.literal(true).optional().nullable(),
  verified: z.literal(true).optional().nullable()
}).strict();
export const UserMaxAggregateInputObjectSchema: z.ZodType<Prisma.UserMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UserMaxAggregateInputType>;
export const UserMaxAggregateInputObjectZodSchema = makeSchema();
