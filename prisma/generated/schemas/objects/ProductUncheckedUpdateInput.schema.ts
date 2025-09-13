import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ProductUpdateimagesInputObjectSchema } from './ProductUpdateimagesInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { ProductUpdatetagsInputObjectSchema } from './ProductUpdatetagsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { CategorySchema } from '../enums/Category.schema';
import { EnumCategoryFieldUpdateOperationsInputObjectSchema } from './EnumCategoryFieldUpdateOperationsInput.schema';
import { SubCategorySchema } from '../enums/SubCategory.schema';
import { NullableEnumSubCategoryFieldUpdateOperationsInputObjectSchema } from './NullableEnumSubCategoryFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { NullableFloatFieldUpdateOperationsInputObjectSchema } from './NullableFloatFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CompanyUncheckedUpdateManyWithoutProductsNestedInputObjectSchema } from './CompanyUncheckedUpdateManyWithoutProductsNestedInput.schema';
import { VariantUncheckedUpdateManyWithoutProductNestedInputObjectSchema } from './VariantUncheckedUpdateManyWithoutProductNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  name: z.union([z.string().max(50), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  images: z.union([z.lazy(() => ProductUpdateimagesInputObjectSchema), z.string().array()]).optional().nullable(),
  description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  vendorName: z.union([z.string().max(50), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  tags: z.union([z.lazy(() => ProductUpdatetagsInputObjectSchema), z.string().array()]).optional().nullable(),
  discount: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  sku: z.union([z.string().max(100), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  availableStock: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  category: z.union([CategorySchema, z.lazy(() => EnumCategoryFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  subCategory: z.union([SubCategorySchema, z.lazy(() => NullableEnumSubCategoryFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  specifications: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional().nullable(),
  avgRating: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  noOfReviews: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  brand: z.union([z.string().max(30), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  companies: z.lazy(() => CompanyUncheckedUpdateManyWithoutProductsNestedInputObjectSchema).optional().nullable(),
  variants: z.lazy(() => VariantUncheckedUpdateManyWithoutProductNestedInputObjectSchema).optional().nullable()
}).strict();
export const ProductUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUncheckedUpdateInput>;
export const ProductUncheckedUpdateInputObjectZodSchema = makeSchema();
