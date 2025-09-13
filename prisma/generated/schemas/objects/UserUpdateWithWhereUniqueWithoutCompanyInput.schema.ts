import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutCompanyInputObjectSchema } from './UserUpdateWithoutCompanyInput.schema';
import { UserUncheckedUpdateWithoutCompanyInputObjectSchema } from './UserUncheckedUpdateWithoutCompanyInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => UserUpdateWithoutCompanyInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutCompanyInputObjectSchema)])
}).strict();
export const UserUpdateWithWhereUniqueWithoutCompanyInputObjectSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutCompanyInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutCompanyInput>;
export const UserUpdateWithWhereUniqueWithoutCompanyInputObjectZodSchema = makeSchema();
