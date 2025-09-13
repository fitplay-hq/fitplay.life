import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyWhereUniqueInputObjectSchema } from './CompanyWhereUniqueInput.schema';
import { CompanyCreateWithoutUsersInputObjectSchema } from './CompanyCreateWithoutUsersInput.schema';
import { CompanyUncheckedCreateWithoutUsersInputObjectSchema } from './CompanyUncheckedCreateWithoutUsersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CompanyWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CompanyCreateWithoutUsersInputObjectSchema), z.lazy(() => CompanyUncheckedCreateWithoutUsersInputObjectSchema)])
}).strict();
export const CompanyCreateOrConnectWithoutUsersInputObjectSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyCreateOrConnectWithoutUsersInput>;
export const CompanyCreateOrConnectWithoutUsersInputObjectZodSchema = makeSchema();
