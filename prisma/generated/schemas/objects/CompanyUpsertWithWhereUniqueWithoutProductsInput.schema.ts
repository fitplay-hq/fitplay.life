import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyWhereUniqueInputObjectSchema } from './CompanyWhereUniqueInput.schema';
import { CompanyUpdateWithoutProductsInputObjectSchema } from './CompanyUpdateWithoutProductsInput.schema';
import { CompanyUncheckedUpdateWithoutProductsInputObjectSchema } from './CompanyUncheckedUpdateWithoutProductsInput.schema';
import { CompanyCreateWithoutProductsInputObjectSchema } from './CompanyCreateWithoutProductsInput.schema';
import { CompanyUncheckedCreateWithoutProductsInputObjectSchema } from './CompanyUncheckedCreateWithoutProductsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CompanyWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CompanyUpdateWithoutProductsInputObjectSchema), z.lazy(() => CompanyUncheckedUpdateWithoutProductsInputObjectSchema)]),
  create: z.union([z.lazy(() => CompanyCreateWithoutProductsInputObjectSchema), z.lazy(() => CompanyUncheckedCreateWithoutProductsInputObjectSchema)])
}).strict();
export const CompanyUpsertWithWhereUniqueWithoutProductsInputObjectSchema: z.ZodType<Prisma.CompanyUpsertWithWhereUniqueWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyUpsertWithWhereUniqueWithoutProductsInput>;
export const CompanyUpsertWithWhereUniqueWithoutProductsInputObjectZodSchema = makeSchema();
