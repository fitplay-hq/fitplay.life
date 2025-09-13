import { z } from 'zod';
import { ProductWhereInputObjectSchema } from './objects/ProductWhereInput.schema';
import { ProductOrderByWithAggregationInputObjectSchema } from './objects/ProductOrderByWithAggregationInput.schema';
import { ProductScalarWhereWithAggregatesInputObjectSchema } from './objects/ProductScalarWhereWithAggregatesInput.schema';
import { ProductScalarFieldEnumSchema } from './enums/ProductScalarFieldEnum.schema';
import { ProductCountAggregateInputObjectSchema } from './objects/ProductCountAggregateInput.schema';
import { ProductMinAggregateInputObjectSchema } from './objects/ProductMinAggregateInput.schema';
import { ProductMaxAggregateInputObjectSchema } from './objects/ProductMaxAggregateInput.schema';

export const ProductGroupBySchema = z.object({ where: ProductWhereInputObjectSchema.optional(), orderBy: z.union([ProductOrderByWithAggregationInputObjectSchema, ProductOrderByWithAggregationInputObjectSchema.array()]).optional(), having: ProductScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(ProductScalarFieldEnumSchema), _count: z.union([ z.literal(true), ProductCountAggregateInputObjectSchema ]).optional(), _min: ProductMinAggregateInputObjectSchema.optional(), _max: ProductMaxAggregateInputObjectSchema.optional() })