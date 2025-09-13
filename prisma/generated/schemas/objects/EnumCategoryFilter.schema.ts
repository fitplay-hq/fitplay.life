import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CategorySchema } from '../enums/Category.schema';
import { NestedEnumCategoryFilterObjectSchema } from './NestedEnumCategoryFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: CategorySchema.optional().nullable(),
  in: CategorySchema.array().optional().nullable(),
  notIn: CategorySchema.array().optional().nullable(),
  not: z.union([CategorySchema, z.lazy(() => NestedEnumCategoryFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumCategoryFilterObjectSchema: z.ZodType<Prisma.EnumCategoryFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCategoryFilter>;
export const EnumCategoryFilterObjectZodSchema = makeSchema();
