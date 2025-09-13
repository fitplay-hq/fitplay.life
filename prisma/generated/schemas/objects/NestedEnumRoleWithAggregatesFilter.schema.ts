import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { RoleSchema } from '../enums/Role.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumRoleFilterObjectSchema } from './NestedEnumRoleFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: RoleSchema.optional().nullable(),
  in: RoleSchema.array().optional().nullable(),
  notIn: RoleSchema.array().optional().nullable(),
  not: z.union([RoleSchema, z.lazy(makeSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional().nullable(),
  _min: z.lazy(() => NestedEnumRoleFilterObjectSchema).optional().nullable(),
  _max: z.lazy(() => NestedEnumRoleFilterObjectSchema).optional().nullable()
}).strict();
export const NestedEnumRoleWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter>;
export const NestedEnumRoleWithAggregatesFilterObjectZodSchema = makeSchema();
