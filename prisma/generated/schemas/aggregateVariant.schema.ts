import { z } from 'zod';
import { VariantOrderByWithRelationInputObjectSchema } from './objects/VariantOrderByWithRelationInput.schema';
import { VariantWhereInputObjectSchema } from './objects/VariantWhereInput.schema';
import { VariantWhereUniqueInputObjectSchema } from './objects/VariantWhereUniqueInput.schema';
import { VariantCountAggregateInputObjectSchema } from './objects/VariantCountAggregateInput.schema';
import { VariantMinAggregateInputObjectSchema } from './objects/VariantMinAggregateInput.schema';
import { VariantMaxAggregateInputObjectSchema } from './objects/VariantMaxAggregateInput.schema';
import { VariantAvgAggregateInputObjectSchema } from './objects/VariantAvgAggregateInput.schema';
import { VariantSumAggregateInputObjectSchema } from './objects/VariantSumAggregateInput.schema';

export const VariantAggregateSchema = z.object({ orderBy: z.union([VariantOrderByWithRelationInputObjectSchema, VariantOrderByWithRelationInputObjectSchema.array()]).optional(), where: VariantWhereInputObjectSchema.optional(), cursor: VariantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), VariantCountAggregateInputObjectSchema ]).optional(), _min: VariantMinAggregateInputObjectSchema.optional(), _max: VariantMaxAggregateInputObjectSchema.optional(), _avg: VariantAvgAggregateInputObjectSchema.optional(), _sum: VariantSumAggregateInputObjectSchema.optional() })