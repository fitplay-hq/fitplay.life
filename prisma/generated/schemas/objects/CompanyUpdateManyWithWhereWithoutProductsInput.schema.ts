import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyScalarWhereInputObjectSchema } from './CompanyScalarWhereInput.schema';
import { CompanyUpdateManyMutationInputObjectSchema } from './CompanyUpdateManyMutationInput.schema';
import { CompanyUncheckedUpdateManyWithoutProductsInputObjectSchema } from './CompanyUncheckedUpdateManyWithoutProductsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CompanyScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CompanyUpdateManyMutationInputObjectSchema), z.lazy(() => CompanyUncheckedUpdateManyWithoutProductsInputObjectSchema)])
}).strict();
export const CompanyUpdateManyWithWhereWithoutProductsInputObjectSchema: z.ZodType<Prisma.CompanyUpdateManyWithWhereWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyUpdateManyWithWhereWithoutProductsInput>;
export const CompanyUpdateManyWithWhereWithoutProductsInputObjectZodSchema = makeSchema();
