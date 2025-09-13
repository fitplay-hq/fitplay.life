import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CategorySchema } from '../enums/Category.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: CategorySchema.optional().nullable(),
  in: CategorySchema.array().optional().nullable(),
  notIn: CategorySchema.array().optional().nullable(),
  not: z.union([CategorySchema, z.lazy(makeSchema)]).optional().nullable()
}).strict();
export const NestedEnumCategoryFilterObjectSchema: z.ZodType<Prisma.NestedEnumCategoryFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedEnumCategoryFilter>;
export const NestedEnumCategoryFilterObjectZodSchema = makeSchema();
