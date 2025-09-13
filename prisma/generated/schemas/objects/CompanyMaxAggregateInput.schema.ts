import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional().nullable(),
  name: z.literal(true).optional().nullable(),
  address: z.literal(true).optional().nullable(),
  createdAt: z.literal(true).optional().nullable(),
  updatedAt: z.literal(true).optional().nullable()
}).strict();
export const CompanyMaxAggregateInputObjectSchema: z.ZodType<Prisma.CompanyMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CompanyMaxAggregateInputType>;
export const CompanyMaxAggregateInputObjectZodSchema = makeSchema();
