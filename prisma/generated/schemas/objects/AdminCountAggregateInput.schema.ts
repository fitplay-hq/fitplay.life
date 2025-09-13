import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional().nullable(),
  name: z.literal(true).optional().nullable(),
  email: z.literal(true).optional().nullable(),
  password: z.literal(true).optional().nullable(),
  role: z.literal(true).optional().nullable(),
  createdAt: z.literal(true).optional().nullable(),
  updatedAt: z.literal(true).optional().nullable(),
  _all: z.literal(true).optional().nullable()
}).strict();
export const AdminCountAggregateInputObjectSchema: z.ZodType<Prisma.AdminCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AdminCountAggregateInputType>;
export const AdminCountAggregateInputObjectZodSchema = makeSchema();
