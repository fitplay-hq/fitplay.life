import { z } from 'zod';

import { CategorySchema } from '../../enums/Category.schema';
import { SubCategorySchema } from '../../enums/SubCategory.schema';
// prettier-ignore
export const ProductModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    images: z.array(z.string()),
    description: z.string(),
    price: z.number().int(),
    vendorName: z.string(),
    tags: z.array(z.string()),
    discount: z.number().int().nullable(),
    sku: z.string(),
    availableStock: z.number().int(),
    category: CategorySchema,
    subCategory: SubCategorySchema.nullable(),
    specifications: z.unknown().nullable(),
    avgRating: z.number().nullable(),
    noOfReviews: z.number().int().nullable(),
    brand: z.string().nullable(),
    companies: z.array(z.unknown()),
    variants: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ProductModelType = z.infer<typeof ProductModelSchema>;
