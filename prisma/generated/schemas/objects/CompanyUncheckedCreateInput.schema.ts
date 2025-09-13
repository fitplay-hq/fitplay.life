import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserUncheckedCreateNestedManyWithoutCompanyInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutCompanyInput.schema';
import { ProductUncheckedCreateNestedManyWithoutCompaniesInputObjectSchema } from './ProductUncheckedCreateNestedManyWithoutCompaniesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  name: z.string().max(50),
  address: z.string().max(100),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputObjectSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutCompaniesInputObjectSchema).optional()
}).strict();
export const CompanyUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CompanyUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyUncheckedCreateInput>;
export const CompanyUncheckedCreateInputObjectZodSchema = makeSchema();
