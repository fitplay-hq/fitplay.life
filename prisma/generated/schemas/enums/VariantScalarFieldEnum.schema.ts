import { z } from 'zod';

export const VariantScalarFieldEnumSchema = z.enum(['id', 'variantCategory', 'variantValue', 'mrp', 'credits', 'productId', 'createdAt', 'updatedAt'])

export type VariantScalarFieldEnum = z.infer<typeof VariantScalarFieldEnumSchema>;