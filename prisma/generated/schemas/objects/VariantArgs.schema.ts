import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { VariantSelectObjectSchema } from './VariantSelect.schema';
import { VariantIncludeObjectSchema } from './VariantInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => VariantSelectObjectSchema).optional().nullable(),
  include: z.lazy(() => VariantIncludeObjectSchema).optional().nullable()
}).strict();
export const VariantArgsObjectSchema = makeSchema();
export const VariantArgsObjectZodSchema = makeSchema();
