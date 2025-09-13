import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductCreateimagesInputObjectSchema } from './ProductCreateimagesInput.schema';
import { ProductCreatetagsInputObjectSchema } from './ProductCreatetagsInput.schema';
import { CategorySchema } from '../enums/Category.schema';
import { SubCategorySchema } from '../enums/SubCategory.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { VariantCreateNestedManyWithoutProductInputObjectSchema } from './VariantCreateNestedManyWithoutProductInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  name: z.string().max(50),
  images: z.union([z.lazy(() => ProductCreateimagesInputObjectSchema), z.string().array()]).optional().nullable(),
  description: z.string(),
  price: z.number().int(),
  vendorName: z.string().max(50),
  tags: z.union([z.lazy(() => ProductCreatetagsInputObjectSchema), z.string().array()]).optional().nullable(),
  discount: z.number().int().optional().nullable(),
  sku: z.string().max(100),
  availableStock: z.number().int(),
  category: CategorySchema,
  subCategory: SubCategorySchema.optional().nullable(),
  specifications: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional().nullable(),
  avgRating: z.number().optional().nullable(),
  noOfReviews: z.number().int().optional().nullable(),
  brand: z.string().max(30).optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  variants: z.lazy(() => VariantCreateNestedManyWithoutProductInputObjectSchema).optional()
}).strict();
export const ProductCreateWithoutCompaniesInputObjectSchema: z.ZodType<Prisma.ProductCreateWithoutCompaniesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateWithoutCompaniesInput>;
export const ProductCreateWithoutCompaniesInputObjectZodSchema = makeSchema();
