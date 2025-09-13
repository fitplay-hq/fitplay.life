import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { VerificationTokenSelectObjectSchema } from './VerificationTokenSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => VerificationTokenSelectObjectSchema).optional().nullable()
}).strict();
export const VerificationTokenArgsObjectSchema = makeSchema();
export const VerificationTokenArgsObjectZodSchema = makeSchema();
