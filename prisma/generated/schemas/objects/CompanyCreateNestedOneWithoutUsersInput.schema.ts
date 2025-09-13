import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyCreateWithoutUsersInputObjectSchema } from './CompanyCreateWithoutUsersInput.schema';
import { CompanyUncheckedCreateWithoutUsersInputObjectSchema } from './CompanyUncheckedCreateWithoutUsersInput.schema';
import { CompanyCreateOrConnectWithoutUsersInputObjectSchema } from './CompanyCreateOrConnectWithoutUsersInput.schema';
import { CompanyWhereUniqueInputObjectSchema } from './CompanyWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => CompanyCreateWithoutUsersInputObjectSchema), z.lazy(() => CompanyUncheckedCreateWithoutUsersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutUsersInputObjectSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputObjectSchema).optional()
}).strict();
export const CompanyCreateNestedOneWithoutUsersInputObjectSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyCreateNestedOneWithoutUsersInput>;
export const CompanyCreateNestedOneWithoutUsersInputObjectZodSchema = makeSchema();
