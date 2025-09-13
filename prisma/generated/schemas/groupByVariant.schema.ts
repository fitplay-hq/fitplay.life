import { z } from 'zod';
import { VariantWhereInputObjectSchema } from './objects/VariantWhereInput.schema';
import { VariantOrderByWithAggregationInputObjectSchema } from './objects/VariantOrderByWithAggregationInput.schema';
import { VariantScalarWhereWithAggregatesInputObjectSchema } from './objects/VariantScalarWhereWithAggregatesInput.schema';
import { VariantScalarFieldEnumSchema } from './enums/VariantScalarFieldEnum.schema';
import { VariantCountAggregateInputObjectSchema } from './objects/VariantCountAggregateInput.schema';
import { VariantMinAggregateInputObjectSchema } from './objects/VariantMinAggregateInput.schema';
import { VariantMaxAggregateInputObjectSchema } from './objects/VariantMaxAggregateInput.schema';

export const VariantGroupBySchema = z.object({ where: VariantWhereInputObjectSchema.optional(), orderBy: z.union([VariantOrderByWithAggregationInputObjectSchema, VariantOrderByWithAggregationInputObjectSchema.array()]).optional(), having: VariantScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(VariantScalarFieldEnumSchema), _count: z.union([ z.literal(true), VariantCountAggregateInputObjectSchema ]).optional(), _min: VariantMinAggregateInputObjectSchema.optional(), _max: VariantMaxAggregateInputObjectSchema.optional() })