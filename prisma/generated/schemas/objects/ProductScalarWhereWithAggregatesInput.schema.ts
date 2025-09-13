import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { EnumCategoryWithAggregatesFilterObjectSchema } from './EnumCategoryWithAggregatesFilter.schema';
import { CategorySchema } from '../enums/Category.schema';
import { EnumSubCategoryNullableWithAggregatesFilterObjectSchema } from './EnumSubCategoryNullableWithAggregatesFilter.schema';
import { SubCategorySchema } from '../enums/SubCategory.schema';
import { JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { FloatNullableWithAggregatesFilterObjectSchema } from './FloatNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  OR: z.lazy(makeSchema).array().optional().nullable(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(50)]).optional().nullable(),
  images: z.lazy(() => StringNullableListFilterObjectSchema).optional().nullable(),
  description: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  price: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  vendorName: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(50)]).optional().nullable(),
  tags: z.lazy(() => StringNullableListFilterObjectSchema).optional().nullable(),
  discount: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  sku: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  availableStock: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  category: z.union([z.lazy(() => EnumCategoryWithAggregatesFilterObjectSchema), CategorySchema]).optional().nullable(),
  subCategory: z.union([z.lazy(() => EnumSubCategoryNullableWithAggregatesFilterObjectSchema), SubCategorySchema]).optional().nullable(),
  specifications: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional().nullable(),
  avgRating: z.union([z.lazy(() => FloatNullableWithAggregatesFilterObjectSchema), z.number()]).optional().nullable(),
  noOfReviews: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  brand: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(30)]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const ProductScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput>;
export const ProductScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
