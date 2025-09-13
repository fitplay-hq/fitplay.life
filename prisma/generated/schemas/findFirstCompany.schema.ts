import { Prisma } from '../../../lib/generated/prisma';
import { z } from 'zod';
import { CompanyIncludeObjectSchema } from './objects/CompanyInclude.schema';
import { CompanyOrderByWithRelationInputObjectSchema } from './objects/CompanyOrderByWithRelationInput.schema';
import { CompanyWhereInputObjectSchema } from './objects/CompanyWhereInput.schema';
import { CompanyWhereUniqueInputObjectSchema } from './objects/CompanyWhereUniqueInput.schema';
import { CompanyScalarFieldEnumSchema } from './enums/CompanyScalarFieldEnum.schema';
import { CompanyCountOutputTypeArgsObjectSchema } from './objects/CompanyCountOutputTypeArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CompanyFindFirstSelectSchema: z.ZodType<Prisma.CompanySelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    address: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    users: z.boolean().optional(),
    products: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CompanySelect>;

export const CompanyFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    address: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    users: z.boolean().optional(),
    products: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CompanyFindFirstSchema: z.ZodType<Prisma.CompanyFindFirstArgs> = z.object({ select: CompanyFindFirstSelectSchema.optional(), include: z.lazy(() => CompanyIncludeObjectSchema.optional()), orderBy: z.union([CompanyOrderByWithRelationInputObjectSchema, CompanyOrderByWithRelationInputObjectSchema.array()]).optional(), where: CompanyWhereInputObjectSchema.optional(), cursor: CompanyWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CompanyFindFirstArgs>;

export const CompanyFindFirstZodSchema = z.object({ select: CompanyFindFirstSelectSchema.optional(), include: z.lazy(() => CompanyIncludeObjectSchema.optional()), orderBy: z.union([CompanyOrderByWithRelationInputObjectSchema, CompanyOrderByWithRelationInputObjectSchema.array()]).optional(), where: CompanyWhereInputObjectSchema.optional(), cursor: CompanyWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array()]).optional() }).strict();