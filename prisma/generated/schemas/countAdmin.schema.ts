import type { Prisma } from '../../../lib/generated/prisma';
import { z } from 'zod';
import { AdminOrderByWithRelationInputObjectSchema } from './objects/AdminOrderByWithRelationInput.schema';
import { AdminWhereInputObjectSchema } from './objects/AdminWhereInput.schema';
import { AdminWhereUniqueInputObjectSchema } from './objects/AdminWhereUniqueInput.schema';
import { AdminCountAggregateInputObjectSchema } from './objects/AdminCountAggregateInput.schema';

export const AdminCountSchema: z.ZodType<Prisma.AdminCountArgs> = z.object({ orderBy: z.union([AdminOrderByWithRelationInputObjectSchema, AdminOrderByWithRelationInputObjectSchema.array()]).optional(), where: AdminWhereInputObjectSchema.optional(), cursor: AdminWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AdminCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.AdminCountArgs>;

export const AdminCountZodSchema = z.object({ orderBy: z.union([AdminOrderByWithRelationInputObjectSchema, AdminOrderByWithRelationInputObjectSchema.array()]).optional(), where: AdminWhereInputObjectSchema.optional(), cursor: AdminWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AdminCountAggregateInputObjectSchema ]).optional() }).strict();