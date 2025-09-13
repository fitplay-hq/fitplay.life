import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  OR: z.lazy(makeSchema).array().optional().nullable(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  variantCategory: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(50)]).optional().nullable(),
  variantValue: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  mrp: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  credits: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  productId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const VariantScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.VariantScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantScalarWhereWithAggregatesInput>;
export const VariantScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
