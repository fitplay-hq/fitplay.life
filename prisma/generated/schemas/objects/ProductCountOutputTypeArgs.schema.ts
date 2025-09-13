import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductCountOutputTypeSelectObjectSchema } from './ProductCountOutputTypeSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => ProductCountOutputTypeSelectObjectSchema).optional().nullable()
}).strict();
export const ProductCountOutputTypeArgsObjectSchema = makeSchema();
export const ProductCountOutputTypeArgsObjectZodSchema = makeSchema();
