import { z } from 'zod';

import { CategorySchema } from '../../enums/Category.schema';
import { SubCategorySchema } from '../../enums/SubCategory.schema';
// prettier-ignore
export const ProductInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    images: z.array(z.string()),
    description: z.string(),
    price: z.number().int(),
    vendorName: z.string(),
    tags: z.array(z.string()),
    discount: z.number().int().optional().nullable(),
    sku: z.string(),
    availableStock: z.number().int(),
    category: CategorySchema,
    subCategory: SubCategorySchema.optional().nullable(),
    specifications: z.unknown().optional().nullable(),
    avgRating: z.number().optional().nullable(),
    noOfReviews: z.number().int().optional().nullable(),
    brand: z.string().optional().nullable(),
    companies: z.array(z.unknown()),
    variants: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ProductInputType = z.infer<typeof ProductInputSchema>;
