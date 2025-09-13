import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserCreateWithoutCompanyInputObjectSchema } from './UserCreateWithoutCompanyInput.schema';
import { UserUncheckedCreateWithoutCompanyInputObjectSchema } from './UserUncheckedCreateWithoutCompanyInput.schema';
import { UserCreateOrConnectWithoutCompanyInputObjectSchema } from './UserCreateOrConnectWithoutCompanyInput.schema';
import { UserCreateManyCompanyInputEnvelopeObjectSchema } from './UserCreateManyCompanyInputEnvelope.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCompanyInputObjectSchema), z.lazy(() => UserCreateWithoutCompanyInputObjectSchema).array(), z.lazy(() => UserUncheckedCreateWithoutCompanyInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => UserCreateOrConnectWithoutCompanyInputObjectSchema), z.lazy(() => UserCreateOrConnectWithoutCompanyInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const UserUncheckedCreateNestedManyWithoutCompanyInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutCompanyInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutCompanyInput>;
export const UserUncheckedCreateNestedManyWithoutCompanyInputObjectZodSchema = makeSchema();
