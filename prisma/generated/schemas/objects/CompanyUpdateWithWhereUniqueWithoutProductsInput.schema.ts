import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyWhereUniqueInputObjectSchema } from './CompanyWhereUniqueInput.schema';
import { CompanyUpdateWithoutProductsInputObjectSchema } from './CompanyUpdateWithoutProductsInput.schema';
import { CompanyUncheckedUpdateWithoutProductsInputObjectSchema } from './CompanyUncheckedUpdateWithoutProductsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CompanyWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CompanyUpdateWithoutProductsInputObjectSchema), z.lazy(() => CompanyUncheckedUpdateWithoutProductsInputObjectSchema)])
}).strict();
export const CompanyUpdateWithWhereUniqueWithoutProductsInputObjectSchema: z.ZodType<Prisma.CompanyUpdateWithWhereUniqueWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyUpdateWithWhereUniqueWithoutProductsInput>;
export const CompanyUpdateWithWhereUniqueWithoutProductsInputObjectZodSchema = makeSchema();
