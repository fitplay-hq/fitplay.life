import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional().nullable(),
  identifier: z.literal(true).optional().nullable(),
  token: z.literal(true).optional().nullable(),
  expires: z.literal(true).optional().nullable(),
  createdAt: z.literal(true).optional().nullable()
}).strict();
export const VerificationTokenMaxAggregateInputObjectSchema: z.ZodType<Prisma.VerificationTokenMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenMaxAggregateInputType>;
export const VerificationTokenMaxAggregateInputObjectZodSchema = makeSchema();
