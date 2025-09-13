import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyFindManySchema } from '../findManyCompany.schema';
import { VariantFindManySchema } from '../findManyVariant.schema';
import { ProductCountOutputTypeArgsObjectSchema } from './ProductCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional().nullable(),
  name: z.boolean().optional().nullable(),
  images: z.boolean().optional().nullable(),
  description: z.boolean().optional().nullable(),
  price: z.boolean().optional().nullable(),
  vendorName: z.boolean().optional().nullable(),
  tags: z.boolean().optional().nullable(),
  discount: z.boolean().optional().nullable(),
  sku: z.boolean().optional().nullable(),
  availableStock: z.boolean().optional().nullable(),
  category: z.boolean().optional().nullable(),
  subCategory: z.boolean().optional().nullable(),
  specifications: z.boolean().optional().nullable(),
  avgRating: z.boolean().optional().nullable(),
  noOfReviews: z.boolean().optional().nullable(),
  brand: z.boolean().optional().nullable(),
  companies: z.union([z.boolean(), z.lazy(() => CompanyFindManySchema)]).optional().nullable(),
  variants: z.union([z.boolean(), z.lazy(() => VariantFindManySchema)]).optional().nullable(),
  createdAt: z.boolean().optional().nullable(),
  updatedAt: z.boolean().optional().nullable(),
  _count: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeArgsObjectSchema)]).optional().nullable()
}).strict();
export const ProductSelectObjectSchema: z.ZodType<Prisma.ProductSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductSelect>;
export const ProductSelectObjectZodSchema = makeSchema();
