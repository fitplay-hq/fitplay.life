import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CategorySchema } from '../enums/Category.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCategoryFilterObjectSchema } from './NestedEnumCategoryFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: CategorySchema.optional().nullable(),
  in: CategorySchema.array().optional().nullable(),
  notIn: CategorySchema.array().optional().nullable(),
  not: z.union([CategorySchema, z.lazy(makeSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional().nullable(),
  _min: z.lazy(() => NestedEnumCategoryFilterObjectSchema).optional().nullable(),
  _max: z.lazy(() => NestedEnumCategoryFilterObjectSchema).optional().nullable()
}).strict();
export const NestedEnumCategoryWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCategoryWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedEnumCategoryWithAggregatesFilter>;
export const NestedEnumCategoryWithAggregatesFilterObjectZodSchema = makeSchema();
