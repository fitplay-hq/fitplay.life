import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { GenderSchema } from '../enums/Gender.schema';
import { NestedEnumGenderNullableWithAggregatesFilterObjectSchema } from './NestedEnumGenderNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumGenderNullableFilterObjectSchema } from './NestedEnumGenderNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: GenderSchema.optional().nullable(),
  in: GenderSchema.array().optional().nullable(),
  notIn: GenderSchema.array().optional().nullable(),
  not: z.union([GenderSchema, z.lazy(() => NestedEnumGenderNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional().nullable(),
  _min: z.lazy(() => NestedEnumGenderNullableFilterObjectSchema).optional().nullable(),
  _max: z.lazy(() => NestedEnumGenderNullableFilterObjectSchema).optional().nullable()
}).strict();
export const EnumGenderNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumGenderNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumGenderNullableWithAggregatesFilter>;
export const EnumGenderNullableWithAggregatesFilterObjectZodSchema = makeSchema();
