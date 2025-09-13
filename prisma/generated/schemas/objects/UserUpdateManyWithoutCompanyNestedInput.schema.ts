import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserCreateWithoutCompanyInputObjectSchema } from './UserCreateWithoutCompanyInput.schema';
import { UserUncheckedCreateWithoutCompanyInputObjectSchema } from './UserUncheckedCreateWithoutCompanyInput.schema';
import { UserCreateOrConnectWithoutCompanyInputObjectSchema } from './UserCreateOrConnectWithoutCompanyInput.schema';
import { UserUpsertWithWhereUniqueWithoutCompanyInputObjectSchema } from './UserUpsertWithWhereUniqueWithoutCompanyInput.schema';
import { UserCreateManyCompanyInputEnvelopeObjectSchema } from './UserCreateManyCompanyInputEnvelope.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithWhereUniqueWithoutCompanyInputObjectSchema } from './UserUpdateWithWhereUniqueWithoutCompanyInput.schema';
import { UserUpdateManyWithWhereWithoutCompanyInputObjectSchema } from './UserUpdateManyWithWhereWithoutCompanyInput.schema';
import { UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCompanyInputObjectSchema), z.lazy(() => UserCreateWithoutCompanyInputObjectSchema).array(), z.lazy(() => UserUncheckedCreateWithoutCompanyInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => UserCreateOrConnectWithoutCompanyInputObjectSchema), z.lazy(() => UserCreateOrConnectWithoutCompanyInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputObjectSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputObjectSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputObjectSchema), z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => UserScalarWhereInputObjectSchema), z.lazy(() => UserScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const UserUpdateManyWithoutCompanyNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateManyWithoutCompanyNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateManyWithoutCompanyNestedInput>;
export const UserUpdateManyWithoutCompanyNestedInputObjectZodSchema = makeSchema();
