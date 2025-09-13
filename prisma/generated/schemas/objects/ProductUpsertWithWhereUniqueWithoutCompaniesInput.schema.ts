import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateWithoutCompaniesInputObjectSchema } from './ProductUpdateWithoutCompaniesInput.schema';
import { ProductUncheckedUpdateWithoutCompaniesInputObjectSchema } from './ProductUncheckedUpdateWithoutCompaniesInput.schema';
import { ProductCreateWithoutCompaniesInputObjectSchema } from './ProductCreateWithoutCompaniesInput.schema';
import { ProductUncheckedCreateWithoutCompaniesInputObjectSchema } from './ProductUncheckedCreateWithoutCompaniesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProductUpdateWithoutCompaniesInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCompaniesInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutCompaniesInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCompaniesInputObjectSchema)])
}).strict();
export const ProductUpsertWithWhereUniqueWithoutCompaniesInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutCompaniesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutCompaniesInput>;
export const ProductUpsertWithWhereUniqueWithoutCompaniesInputObjectZodSchema = makeSchema();
