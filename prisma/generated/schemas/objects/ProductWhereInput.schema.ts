import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnumCategoryFilterObjectSchema } from './EnumCategoryFilter.schema';
import { CategorySchema } from '../enums/Category.schema';
import { EnumSubCategoryNullableFilterObjectSchema } from './EnumSubCategoryNullableFilter.schema';
import { SubCategorySchema } from '../enums/SubCategory.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CompanyListRelationFilterObjectSchema } from './CompanyListRelationFilter.schema';
import { VariantListRelationFilterObjectSchema } from './VariantListRelationFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  OR: z.lazy(makeSchema).array().optional().nullable(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(50)]).optional().nullable(),
  images: z.lazy(() => StringNullableListFilterObjectSchema).optional().nullable(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  price: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional().nullable(),
  vendorName: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(50)]).optional().nullable(),
  tags: z.lazy(() => StringNullableListFilterObjectSchema).optional().nullable(),
  discount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  sku: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  availableStock: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional().nullable(),
  category: z.union([z.lazy(() => EnumCategoryFilterObjectSchema), CategorySchema]).optional().nullable(),
  subCategory: z.union([z.lazy(() => EnumSubCategoryNullableFilterObjectSchema), SubCategorySchema]).optional().nullable(),
  specifications: z.lazy(() => JsonNullableFilterObjectSchema).optional().nullable(),
  avgRating: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  noOfReviews: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  brand: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(30)]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  companies: z.lazy(() => CompanyListRelationFilterObjectSchema).optional(),
  variants: z.lazy(() => VariantListRelationFilterObjectSchema).optional()
}).strict();
export const ProductWhereInputObjectSchema: z.ZodType<Prisma.ProductWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductWhereInput>;
export const ProductWhereInputObjectZodSchema = makeSchema();
