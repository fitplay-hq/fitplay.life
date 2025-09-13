import { Prisma } from '../../../lib/generated/prisma';
import { z } from 'zod';
import { VariantIncludeObjectSchema } from './objects/VariantInclude.schema';
import { VariantOrderByWithRelationInputObjectSchema } from './objects/VariantOrderByWithRelationInput.schema';
import { VariantWhereInputObjectSchema } from './objects/VariantWhereInput.schema';
import { VariantWhereUniqueInputObjectSchema } from './objects/VariantWhereUniqueInput.schema';
import { VariantScalarFieldEnumSchema } from './enums/VariantScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const VariantFindManySelectSchema: z.ZodType<Prisma.VariantSelect> = z.object({
    id: z.boolean().optional(),
    variantCategory: z.boolean().optional(),
    variantValue: z.boolean().optional(),
    mrp: z.boolean().optional(),
    credits: z.boolean().optional(),
    product: z.boolean().optional(),
    productId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.VariantSelect>;

export const VariantFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    variantCategory: z.boolean().optional(),
    variantValue: z.boolean().optional(),
    mrp: z.boolean().optional(),
    credits: z.boolean().optional(),
    product: z.boolean().optional(),
    productId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const VariantFindManySchema: z.ZodType<Prisma.VariantFindManyArgs> = z.object({ select: VariantFindManySelectSchema.optional(), include: z.lazy(() => VariantIncludeObjectSchema.optional()), orderBy: z.union([VariantOrderByWithRelationInputObjectSchema, VariantOrderByWithRelationInputObjectSchema.array()]).optional(), where: VariantWhereInputObjectSchema.optional(), cursor: VariantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([VariantScalarFieldEnumSchema, VariantScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.VariantFindManyArgs>;

export const VariantFindManyZodSchema = z.object({ select: VariantFindManySelectSchema.optional(), include: z.lazy(() => VariantIncludeObjectSchema.optional()), orderBy: z.union([VariantOrderByWithRelationInputObjectSchema, VariantOrderByWithRelationInputObjectSchema.array()]).optional(), where: VariantWhereInputObjectSchema.optional(), cursor: VariantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([VariantScalarFieldEnumSchema, VariantScalarFieldEnumSchema.array()]).optional() }).strict();