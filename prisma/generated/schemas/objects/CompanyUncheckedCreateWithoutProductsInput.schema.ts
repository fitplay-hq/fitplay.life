import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserUncheckedCreateNestedManyWithoutCompanyInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutCompanyInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  name: z.string(),
  address: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputObjectSchema).optional()
}).strict();
export const CompanyUncheckedCreateWithoutProductsInputObjectSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyUncheckedCreateWithoutProductsInput>;
export const CompanyUncheckedCreateWithoutProductsInputObjectZodSchema = makeSchema();
