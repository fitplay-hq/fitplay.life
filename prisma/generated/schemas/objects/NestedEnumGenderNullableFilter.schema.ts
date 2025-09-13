import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { GenderSchema } from '../enums/Gender.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: GenderSchema.optional().nullable(),
  in: GenderSchema.array().optional().nullable(),
  notIn: GenderSchema.array().optional().nullable(),
  not: z.union([GenderSchema, z.lazy(makeSchema)]).optional().nullable()
}).strict();
export const NestedEnumGenderNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumGenderNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedEnumGenderNullableFilter>;
export const NestedEnumGenderNullableFilterObjectZodSchema = makeSchema();
