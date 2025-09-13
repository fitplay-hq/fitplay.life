import type { Prisma } from '../../../lib/generated/prisma';
import { z } from 'zod';
import { CompanyOrderByWithRelationInputObjectSchema } from './objects/CompanyOrderByWithRelationInput.schema';
import { CompanyWhereInputObjectSchema } from './objects/CompanyWhereInput.schema';
import { CompanyWhereUniqueInputObjectSchema } from './objects/CompanyWhereUniqueInput.schema';
import { CompanyCountAggregateInputObjectSchema } from './objects/CompanyCountAggregateInput.schema';

export const CompanyCountSchema: z.ZodType<Prisma.CompanyCountArgs> = z.object({ orderBy: z.union([CompanyOrderByWithRelationInputObjectSchema, CompanyOrderByWithRelationInputObjectSchema.array()]).optional(), where: CompanyWhereInputObjectSchema.optional(), cursor: CompanyWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CompanyCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CompanyCountArgs>;

export const CompanyCountZodSchema = z.object({ orderBy: z.union([CompanyOrderByWithRelationInputObjectSchema, CompanyOrderByWithRelationInputObjectSchema.array()]).optional(), where: CompanyWhereInputObjectSchema.optional(), cursor: CompanyWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CompanyCountAggregateInputObjectSchema ]).optional() }).strict();