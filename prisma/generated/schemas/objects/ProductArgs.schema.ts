import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductSelectObjectSchema } from './ProductSelect.schema';
import { ProductIncludeObjectSchema } from './ProductInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => ProductSelectObjectSchema).optional().nullable(),
  include: z.lazy(() => ProductIncludeObjectSchema).optional().nullable()
}).strict();
export const ProductArgsObjectSchema = makeSchema();
export const ProductArgsObjectZodSchema = makeSchema();
