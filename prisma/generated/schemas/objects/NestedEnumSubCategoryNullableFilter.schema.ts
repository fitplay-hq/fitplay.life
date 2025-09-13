import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SubCategorySchema } from '../enums/SubCategory.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: SubCategorySchema.optional().nullable(),
  in: SubCategorySchema.array().optional().nullable(),
  notIn: SubCategorySchema.array().optional().nullable(),
  not: z.union([SubCategorySchema, z.lazy(makeSchema)]).optional().nullable()
}).strict();
export const NestedEnumSubCategoryNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumSubCategoryNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedEnumSubCategoryNullableFilter>;
export const NestedEnumSubCategoryNullableFilterObjectZodSchema = makeSchema();
