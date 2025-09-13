import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductArgsObjectSchema } from './ProductArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional().nullable()
}).strict();
export const VariantIncludeObjectSchema: z.ZodType<Prisma.VariantInclude> = makeSchema() as unknown as z.ZodType<Prisma.VariantInclude>;
export const VariantIncludeObjectZodSchema = makeSchema();
