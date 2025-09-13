import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { RoleSchema } from '../enums/Role.schema';
import { GenderSchema } from '../enums/Gender.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  name: z.string().max(30),
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
export const UserCreateWithoutCompanyInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutCompanyInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutCompanyInput>;
export const UserCreateWithoutCompanyInputObjectZodSchema = makeSchema();
