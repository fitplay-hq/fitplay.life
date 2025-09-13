import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductUncheckedCreateNestedManyWithoutCompaniesInputObjectSchema } from './ProductUncheckedCreateNestedManyWithoutCompaniesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  name: z.string(),
  address: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutCompaniesInputObjectSchema).optional()
}).strict();
export const CompanyUncheckedCreateWithoutUsersInputObjectSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyUncheckedCreateWithoutUsersInput>;
export const CompanyUncheckedCreateWithoutUsersInputObjectZodSchema = makeSchema();
