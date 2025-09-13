import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SubCategorySchema } from '../enums/SubCategory.schema';
import { NestedEnumSubCategoryNullableFilterObjectSchema } from './NestedEnumSubCategoryNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: SubCategorySchema.optional().nullable(),
  in: SubCategorySchema.array().optional().nullable(),
  notIn: SubCategorySchema.array().optional().nullable(),
  not: z.union([SubCategorySchema, z.lazy(() => NestedEnumSubCategoryNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumSubCategoryNullableFilterObjectSchema: z.ZodType<Prisma.EnumSubCategoryNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSubCategoryNullableFilter>;
export const EnumSubCategoryNullableFilterObjectZodSchema = makeSchema();
