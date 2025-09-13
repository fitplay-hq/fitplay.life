import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutCompanyInputObjectSchema } from './UserUpdateWithoutCompanyInput.schema';
import { UserUncheckedUpdateWithoutCompanyInputObjectSchema } from './UserUncheckedUpdateWithoutCompanyInput.schema';
import { UserCreateWithoutCompanyInputObjectSchema } from './UserCreateWithoutCompanyInput.schema';
import { UserUncheckedCreateWithoutCompanyInputObjectSchema } from './UserUncheckedCreateWithoutCompanyInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => UserUpdateWithoutCompanyInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCompanyInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCompanyInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyInputObjectSchema)])
}).strict();
export const UserUpsertWithWhereUniqueWithoutCompanyInputObjectSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutCompanyInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutCompanyInput>;
export const UserUpsertWithWhereUniqueWithoutCompanyInputObjectZodSchema = makeSchema();
