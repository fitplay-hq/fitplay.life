import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { RoleSchema } from '../enums/Role.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: RoleSchema.optional().nullable(),
  in: RoleSchema.array().optional().nullable(),
  notIn: RoleSchema.array().optional().nullable(),
  not: z.union([RoleSchema, z.lazy(makeSchema)]).optional().nullable()
}).strict();
export const NestedEnumRoleFilterObjectSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedEnumRoleFilter>;
export const NestedEnumRoleFilterObjectZodSchema = makeSchema();
