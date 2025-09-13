import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumRoleFilterObjectSchema } from './EnumRoleFilter.schema';
import { RoleSchema } from '../enums/Role.schema';
import { EnumGenderNullableFilterObjectSchema } from './EnumGenderNullableFilter.schema';
import { GenderSchema } from '../enums/Gender.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  OR: z.lazy(makeSchema).array().optional().nullable(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  password: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  phone: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  role: z.union([z.lazy(() => EnumRoleFilterObjectSchema), RoleSchema]).optional().nullable(),
  gender: z.union([z.lazy(() => EnumGenderNullableFilterObjectSchema), GenderSchema]).optional().nullable(),
  birthDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  companyId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  verified: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional().nullable()
}).strict();
export const UserScalarWhereInputObjectSchema: z.ZodType<Prisma.UserScalarWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.UserScalarWhereInput>;
export const UserScalarWhereInputObjectZodSchema = makeSchema();
