import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SubCategorySchema } from '../enums/SubCategory.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumSubCategoryNullableFilterObjectSchema } from './NestedEnumSubCategoryNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: SubCategorySchema.optional().nullable(),
  in: SubCategorySchema.array().optional().nullable(),
  notIn: SubCategorySchema.array().optional().nullable(),
  not: z.union([SubCategorySchema, z.lazy(makeSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional().nullable(),
  _min: z.lazy(() => NestedEnumSubCategoryNullableFilterObjectSchema).optional().nullable(),
  _max: z.lazy(() => NestedEnumSubCategoryNullableFilterObjectSchema).optional().nullable()
}).strict();
export const NestedEnumSubCategoryNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumSubCategoryNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedEnumSubCategoryNullableWithAggregatesFilter>;
export const NestedEnumSubCategoryNullableWithAggregatesFilterObjectZodSchema = makeSchema();
