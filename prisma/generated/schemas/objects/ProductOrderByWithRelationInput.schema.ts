import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CompanyOrderByRelationAggregateInputObjectSchema } from './CompanyOrderByRelationAggregateInput.schema';
import { VariantOrderByRelationAggregateInputObjectSchema } from './VariantOrderByRelationAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  name: SortOrderSchema.optional().nullable(),
  images: SortOrderSchema.optional().nullable(),
  description: SortOrderSchema.optional().nullable(),
  price: SortOrderSchema.optional().nullable(),
  vendorName: SortOrderSchema.optional().nullable(),
  tags: SortOrderSchema.optional().nullable(),
  discount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional().nullable(),
  sku: SortOrderSchema.optional().nullable(),
  availableStock: SortOrderSchema.optional().nullable(),
  category: SortOrderSchema.optional().nullable(),
  subCategory: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional().nullable(),
  specifications: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional().nullable(),
  avgRating: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional().nullable(),
  noOfReviews: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional().nullable(),
  brand: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  updatedAt: SortOrderSchema.optional().nullable(),
  companies: z.lazy(() => CompanyOrderByRelationAggregateInputObjectSchema).optional(),
  variants: z.lazy(() => VariantOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ProductOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOrderByWithRelationInput>;
export const ProductOrderByWithRelationInputObjectZodSchema = makeSchema();
