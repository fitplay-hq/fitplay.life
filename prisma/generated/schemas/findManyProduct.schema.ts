import { Prisma } from '../../../lib/generated/prisma';
import { z } from 'zod';
import { ProductIncludeObjectSchema } from './objects/ProductInclude.schema';
import { ProductOrderByWithRelationInputObjectSchema } from './objects/ProductOrderByWithRelationInput.schema';
import { ProductWhereInputObjectSchema } from './objects/ProductWhereInput.schema';
import { ProductWhereUniqueInputObjectSchema } from './objects/ProductWhereUniqueInput.schema';
import { ProductScalarFieldEnumSchema } from './enums/ProductScalarFieldEnum.schema';
import { ProductCountOutputTypeArgsObjectSchema } from './objects/ProductCountOutputTypeArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProductFindManySelectSchema: z.ZodType<Prisma.ProductSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    images: z.boolean().optional(),
    description: z.boolean().optional(),
    price: z.boolean().optional(),
    vendorName: z.boolean().optional(),
    tags: z.boolean().optional(),
    discount: z.boolean().optional(),
    sku: z.boolean().optional(),
    availableStock: z.boolean().optional(),
    category: z.boolean().optional(),
    subCategory: z.boolean().optional(),
    specifications: z.boolean().optional(),
    avgRating: z.boolean().optional(),
    noOfReviews: z.boolean().optional(),
    brand: z.boolean().optional(),
    companies: z.boolean().optional(),
    variants: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ProductSelect>;

export const ProductFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    images: z.boolean().optional(),
    description: z.boolean().optional(),
    price: z.boolean().optional(),
    vendorName: z.boolean().optional(),
    tags: z.boolean().optional(),
    discount: z.boolean().optional(),
    sku: z.boolean().optional(),
    availableStock: z.boolean().optional(),
    category: z.boolean().optional(),
    subCategory: z.boolean().optional(),
    specifications: z.boolean().optional(),
    avgRating: z.boolean().optional(),
    noOfReviews: z.boolean().optional(),
    brand: z.boolean().optional(),
    companies: z.boolean().optional(),
    variants: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ProductFindManySchema: z.ZodType<Prisma.ProductFindManyArgs> = z.object({ select: ProductFindManySelectSchema.optional(), include: z.lazy(() => ProductIncludeObjectSchema.optional()), orderBy: z.union([ProductOrderByWithRelationInputObjectSchema, ProductOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductWhereInputObjectSchema.optional(), cursor: ProductWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ProductFindManyArgs>;

export const ProductFindManyZodSchema = z.object({ select: ProductFindManySelectSchema.optional(), include: z.lazy(() => ProductIncludeObjectSchema.optional()), orderBy: z.union([ProductOrderByWithRelationInputObjectSchema, ProductOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductWhereInputObjectSchema.optional(), cursor: ProductWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array()]).optional() }).strict();