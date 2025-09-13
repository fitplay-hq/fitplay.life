import { z } from 'zod';
export const ProductFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  price: z.number().int(),
  vendorName: z.string(),
  tags: z.array(z.string()),
  discount: z.number().int().optional(),
  sku: z.string(),
  availableStock: z.number().int(),
  category: z.unknown(),
  subCategory: z.unknown().optional(),
  specifications: z.unknown().optional(),
  avgRating: z.number().optional(),
  noOfReviews: z.number().int().optional(),
  brand: z.string().optional(),
  companies: z.array(z.unknown()),
  variants: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date()
}));