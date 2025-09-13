import { z } from 'zod';
import { CompanyWhereInputObjectSchema } from './objects/CompanyWhereInput.schema';
import { CompanyOrderByWithAggregationInputObjectSchema } from './objects/CompanyOrderByWithAggregationInput.schema';
import { CompanyScalarWhereWithAggregatesInputObjectSchema } from './objects/CompanyScalarWhereWithAggregatesInput.schema';
import { CompanyScalarFieldEnumSchema } from './enums/CompanyScalarFieldEnum.schema';
import { CompanyCountAggregateInputObjectSchema } from './objects/CompanyCountAggregateInput.schema';
import { CompanyMinAggregateInputObjectSchema } from './objects/CompanyMinAggregateInput.schema';
import { CompanyMaxAggregateInputObjectSchema } from './objects/CompanyMaxAggregateInput.schema';

export const CompanyGroupBySchema = z.object({ where: CompanyWhereInputObjectSchema.optional(), orderBy: z.union([CompanyOrderByWithAggregationInputObjectSchema, CompanyOrderByWithAggregationInputObjectSchema.array()]).optional(), having: CompanyScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(CompanyScalarFieldEnumSchema), _count: z.union([ z.literal(true), CompanyCountAggregateInputObjectSchema ]).optional(), _min: CompanyMinAggregateInputObjectSchema.optional(), _max: CompanyMaxAggregateInputObjectSchema.optional() })