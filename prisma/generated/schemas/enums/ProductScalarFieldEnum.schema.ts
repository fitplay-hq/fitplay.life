import { z } from 'zod';

export const ProductScalarFieldEnumSchema = z.enum(['id', 'name', 'images', 'description', 'price', 'vendorName', 'tags', 'discount', 'sku', 'availableStock', 'category', 'subCategory', 'specifications', 'avgRating', 'noOfReviews', 'brand', 'createdAt', 'updatedAt'])

export type ProductScalarFieldEnum = z.infer<typeof ProductScalarFieldEnumSchema>;