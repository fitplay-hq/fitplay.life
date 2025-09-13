import type { Prisma } from '../../../lib/generated/prisma';
import { z } from 'zod';
import { VariantOrderByWithRelationInputObjectSchema } from './objects/VariantOrderByWithRelationInput.schema';
import { VariantWhereInputObjectSchema } from './objects/VariantWhereInput.schema';
import { VariantWhereUniqueInputObjectSchema } from './objects/VariantWhereUniqueInput.schema';
import { VariantCountAggregateInputObjectSchema } from './objects/VariantCountAggregateInput.schema';

export const VariantCountSchema: z.ZodType<Prisma.VariantCountArgs> = z.object({ orderBy: z.union([VariantOrderByWithRelationInputObjectSchema, VariantOrderByWithRelationInputObjectSchema.array()]).optional(), where: VariantWhereInputObjectSchema.optional(), cursor: VariantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), VariantCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.VariantCountArgs>;

export const VariantCountZodSchema = z.object({ orderBy: z.union([VariantOrderByWithRelationInputObjectSchema, VariantOrderByWithRelationInputObjectSchema.array()]).optional(), where: VariantWhereInputObjectSchema.optional(), cursor: VariantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), VariantCountAggregateInputObjectSchema ]).optional() }).strict();