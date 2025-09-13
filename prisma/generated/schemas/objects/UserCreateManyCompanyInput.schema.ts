import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { RoleSchema } from '../enums/Role.schema';
import { GenderSchema } from '../enums/Gender.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  role: RoleSchema,
  gender: GenderSchema.optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  verified: z.boolean().optional().nullable()
}).strict();
export const UserCreateManyCompanyInputObjectSchema: z.ZodType<Prisma.UserCreateManyCompanyInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateManyCompanyInput>;
export const UserCreateManyCompanyInputObjectZodSchema = makeSchema();
