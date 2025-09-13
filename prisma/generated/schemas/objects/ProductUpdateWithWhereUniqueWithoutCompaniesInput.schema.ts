import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateWithoutCompaniesInputObjectSchema } from './ProductUpdateWithoutCompaniesInput.schema';
import { ProductUncheckedUpdateWithoutCompaniesInputObjectSchema } from './ProductUncheckedUpdateWithoutCompaniesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProductUpdateWithoutCompaniesInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCompaniesInputObjectSchema)])
}).strict();
export const ProductUpdateWithWhereUniqueWithoutCompaniesInputObjectSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutCompaniesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutCompaniesInput>;
export const ProductUpdateWithWhereUniqueWithoutCompaniesInputObjectZodSchema = makeSchema();
