import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyCreateWithoutUsersInputObjectSchema } from './CompanyCreateWithoutUsersInput.schema';
import { CompanyUncheckedCreateWithoutUsersInputObjectSchema } from './CompanyUncheckedCreateWithoutUsersInput.schema';
import { CompanyCreateOrConnectWithoutUsersInputObjectSchema } from './CompanyCreateOrConnectWithoutUsersInput.schema';
import { CompanyUpsertWithoutUsersInputObjectSchema } from './CompanyUpsertWithoutUsersInput.schema';
import { CompanyWhereUniqueInputObjectSchema } from './CompanyWhereUniqueInput.schema';
import { CompanyUpdateToOneWithWhereWithoutUsersInputObjectSchema } from './CompanyUpdateToOneWithWhereWithoutUsersInput.schema';
import { CompanyUpdateWithoutUsersInputObjectSchema } from './CompanyUpdateWithoutUsersInput.schema';
import { CompanyUncheckedUpdateWithoutUsersInputObjectSchema } from './CompanyUncheckedUpdateWithoutUsersInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => CompanyCreateWithoutUsersInputObjectSchema), z.lazy(() => CompanyUncheckedCreateWithoutUsersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutUsersInputObjectSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutUsersInputObjectSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CompanyUpdateToOneWithWhereWithoutUsersInputObjectSchema), z.lazy(() => CompanyUpdateWithoutUsersInputObjectSchema), z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputObjectSchema)]).optional()
}).strict();
export const CompanyUpdateOneRequiredWithoutUsersNestedInputObjectSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutUsersNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutUsersNestedInput>;
export const CompanyUpdateOneRequiredWithoutUsersNestedInputObjectZodSchema = makeSchema();
