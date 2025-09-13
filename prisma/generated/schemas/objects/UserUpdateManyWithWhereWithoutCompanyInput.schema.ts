import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema';
import { UserUpdateManyMutationInputObjectSchema } from './UserUpdateManyMutationInput.schema';
import { UserUncheckedUpdateManyWithoutCompanyInputObjectSchema } from './UserUncheckedUpdateManyWithoutCompanyInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => UserScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => UserUpdateManyMutationInputObjectSchema), z.lazy(() => UserUncheckedUpdateManyWithoutCompanyInputObjectSchema)])
}).strict();
export const UserUpdateManyWithWhereWithoutCompanyInputObjectSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutCompanyInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateManyWithWhereWithoutCompanyInput>;
export const UserUpdateManyWithWhereWithoutCompanyInputObjectZodSchema = makeSchema();
