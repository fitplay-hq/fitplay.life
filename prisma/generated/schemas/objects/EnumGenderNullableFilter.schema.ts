import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { GenderSchema } from '../enums/Gender.schema';
import { NestedEnumGenderNullableFilterObjectSchema } from './NestedEnumGenderNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: GenderSchema.optional().nullable(),
  in: GenderSchema.array().optional().nullable(),
  notIn: GenderSchema.array().optional().nullable(),
  not: z.union([GenderSchema, z.lazy(() => NestedEnumGenderNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumGenderNullableFilterObjectSchema: z.ZodType<Prisma.EnumGenderNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumGenderNullableFilter>;
export const EnumGenderNullableFilterObjectZodSchema = makeSchema();
