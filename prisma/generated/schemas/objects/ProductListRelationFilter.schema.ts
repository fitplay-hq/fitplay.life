import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => ProductWhereInputObjectSchema).optional().nullable(),
  some: z.lazy(() => ProductWhereInputObjectSchema).optional().nullable(),
  none: z.lazy(() => ProductWhereInputObjectSchema).optional().nullable()
}).strict();
export const ProductListRelationFilterObjectSchema: z.ZodType<Prisma.ProductListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProductListRelationFilter>;
export const ProductListRelationFilterObjectZodSchema = makeSchema();
