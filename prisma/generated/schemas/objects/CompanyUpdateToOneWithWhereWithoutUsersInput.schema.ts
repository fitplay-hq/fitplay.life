import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyWhereInputObjectSchema } from './CompanyWhereInput.schema';
import { CompanyUpdateWithoutUsersInputObjectSchema } from './CompanyUpdateWithoutUsersInput.schema';
import { CompanyUncheckedUpdateWithoutUsersInputObjectSchema } from './CompanyUncheckedUpdateWithoutUsersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CompanyWhereInputObjectSchema).optional().nullable(),
  data: z.union([z.lazy(() => CompanyUpdateWithoutUsersInputObjectSchema), z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputObjectSchema)])
}).strict();
export const CompanyUpdateToOneWithWhereWithoutUsersInputObjectSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutUsersInput>;
export const CompanyUpdateToOneWithWhereWithoutUsersInputObjectZodSchema = makeSchema();
