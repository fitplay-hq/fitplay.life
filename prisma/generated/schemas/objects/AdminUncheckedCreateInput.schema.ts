import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { RoleSchema } from '../enums/Role.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string(),
  password: z.string(),
  role: RoleSchema.optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const AdminUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AdminUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AdminUncheckedCreateInput>;
export const AdminUncheckedCreateInputObjectZodSchema = makeSchema();
