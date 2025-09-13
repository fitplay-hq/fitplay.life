import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { RoleSchema } from '../enums/Role.schema';
import { NestedEnumRoleFilterObjectSchema } from './NestedEnumRoleFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: RoleSchema.optional().nullable(),
  in: RoleSchema.array().optional().nullable(),
  notIn: RoleSchema.array().optional().nullable(),
  not: z.union([RoleSchema, z.lazy(() => NestedEnumRoleFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumRoleFilterObjectSchema: z.ZodType<Prisma.EnumRoleFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumRoleFilter>;
export const EnumRoleFilterObjectZodSchema = makeSchema();
