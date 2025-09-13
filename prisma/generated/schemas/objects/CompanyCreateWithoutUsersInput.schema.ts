import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductCreateNestedManyWithoutCompaniesInputObjectSchema } from './ProductCreateNestedManyWithoutCompaniesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  name: z.string().max(50),
  address: z.string().max(100),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  products: z.lazy(() => ProductCreateNestedManyWithoutCompaniesInputObjectSchema).optional()
}).strict();
export const CompanyCreateWithoutUsersInputObjectSchema: z.ZodType<Prisma.CompanyCreateWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyCreateWithoutUsersInput>;
export const CompanyCreateWithoutUsersInputObjectZodSchema = makeSchema();
