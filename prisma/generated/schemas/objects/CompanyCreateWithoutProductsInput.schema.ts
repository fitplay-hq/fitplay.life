import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserCreateNestedManyWithoutCompanyInputObjectSchema } from './UserCreateNestedManyWithoutCompanyInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  name: z.string().max(50),
  address: z.string().max(100),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UserCreateNestedManyWithoutCompanyInputObjectSchema).optional()
}).strict();
export const CompanyCreateWithoutProductsInputObjectSchema: z.ZodType<Prisma.CompanyCreateWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyCreateWithoutProductsInput>;
export const CompanyCreateWithoutProductsInputObjectZodSchema = makeSchema();
