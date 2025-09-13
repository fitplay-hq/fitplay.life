import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyUpdateWithoutUsersInputObjectSchema } from './CompanyUpdateWithoutUsersInput.schema';
import { CompanyUncheckedUpdateWithoutUsersInputObjectSchema } from './CompanyUncheckedUpdateWithoutUsersInput.schema';
import { CompanyCreateWithoutUsersInputObjectSchema } from './CompanyCreateWithoutUsersInput.schema';
import { CompanyUncheckedCreateWithoutUsersInputObjectSchema } from './CompanyUncheckedCreateWithoutUsersInput.schema';
import { CompanyWhereInputObjectSchema } from './CompanyWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => CompanyUpdateWithoutUsersInputObjectSchema), z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputObjectSchema)]),
  create: z.union([z.lazy(() => CompanyCreateWithoutUsersInputObjectSchema), z.lazy(() => CompanyUncheckedCreateWithoutUsersInputObjectSchema)]),
  where: z.lazy(() => CompanyWhereInputObjectSchema).optional().nullable()
}).strict();
export const CompanyUpsertWithoutUsersInputObjectSchema: z.ZodType<Prisma.CompanyUpsertWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyUpsertWithoutUsersInput>;
export const CompanyUpsertWithoutUsersInputObjectZodSchema = makeSchema();
