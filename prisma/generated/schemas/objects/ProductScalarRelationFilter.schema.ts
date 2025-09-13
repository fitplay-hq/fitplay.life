import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is: z.lazy(() => ProductWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => ProductWhereInputObjectSchema).optional().nullable()
}).strict();
export const ProductScalarRelationFilterObjectSchema: z.ZodType<Prisma.ProductScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProductScalarRelationFilter>;
export const ProductScalarRelationFilterObjectZodSchema = makeSchema();
