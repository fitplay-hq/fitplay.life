import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional().nullable(),
  name: z.literal(true).optional().nullable(),
  address: z.literal(true).optional().nullable(),
  createdAt: z.literal(true).optional().nullable(),
  updatedAt: z.literal(true).optional().nullable(),
  _all: z.literal(true).optional().nullable()
}).strict();
export const CompanyCountAggregateInputObjectSchema: z.ZodType<Prisma.CompanyCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CompanyCountAggregateInputType>;
export const CompanyCountAggregateInputObjectZodSchema = makeSchema();
