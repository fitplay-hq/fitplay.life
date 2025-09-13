import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  OR: z.lazy(makeSchema).array().optional().nullable(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  variantCategory: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  variantValue: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  mrp: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional().nullable(),
  credits: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  productId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const VariantScalarWhereInputObjectSchema: z.ZodType<Prisma.VariantScalarWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantScalarWhereInput>;
export const VariantScalarWhereInputObjectZodSchema = makeSchema();
