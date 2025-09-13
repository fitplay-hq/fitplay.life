import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional().nullable(),
  identifier: z.boolean().optional().nullable(),
  token: z.boolean().optional().nullable(),
  expires: z.boolean().optional().nullable(),
  createdAt: z.boolean().optional().nullable()
}).strict();
export const VerificationTokenSelectObjectSchema: z.ZodType<Prisma.VerificationTokenSelect> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenSelect>;
export const VerificationTokenSelectObjectZodSchema = makeSchema();
