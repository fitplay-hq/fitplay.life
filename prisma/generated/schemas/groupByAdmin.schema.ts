import { z } from 'zod';
import { AdminWhereInputObjectSchema } from './objects/AdminWhereInput.schema';
import { AdminOrderByWithAggregationInputObjectSchema } from './objects/AdminOrderByWithAggregationInput.schema';
import { AdminScalarWhereWithAggregatesInputObjectSchema } from './objects/AdminScalarWhereWithAggregatesInput.schema';
import { AdminScalarFieldEnumSchema } from './enums/AdminScalarFieldEnum.schema';
import { AdminCountAggregateInputObjectSchema } from './objects/AdminCountAggregateInput.schema';
import { AdminMinAggregateInputObjectSchema } from './objects/AdminMinAggregateInput.schema';
import { AdminMaxAggregateInputObjectSchema } from './objects/AdminMaxAggregateInput.schema';

export const AdminGroupBySchema = z.object({ where: AdminWhereInputObjectSchema.optional(), orderBy: z.union([AdminOrderByWithAggregationInputObjectSchema, AdminOrderByWithAggregationInputObjectSchema.array()]).optional(), having: AdminScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(AdminScalarFieldEnumSchema), _count: z.union([ z.literal(true), AdminCountAggregateInputObjectSchema ]).optional(), _min: AdminMinAggregateInputObjectSchema.optional(), _max: AdminMaxAggregateInputObjectSchema.optional() })