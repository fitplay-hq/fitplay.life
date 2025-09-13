import { z } from 'zod';
export const ProductFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});