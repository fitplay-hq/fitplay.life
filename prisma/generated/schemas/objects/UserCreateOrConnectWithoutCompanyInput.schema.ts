import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCompanyInputObjectSchema } from './UserCreateWithoutCompanyInput.schema';
import { UserUncheckedCreateWithoutCompanyInputObjectSchema } from './UserUncheckedCreateWithoutCompanyInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCompanyInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutCompanyInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCompanyInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutCompanyInput>;
export const UserCreateOrConnectWithoutCompanyInputObjectZodSchema = makeSchema();
