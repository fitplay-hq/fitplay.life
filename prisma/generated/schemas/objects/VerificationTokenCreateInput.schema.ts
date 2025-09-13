import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();
export const VerificationTokenCreateInputObjectSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenCreateInput>;
export const VerificationTokenCreateInputObjectZodSchema = makeSchema();
