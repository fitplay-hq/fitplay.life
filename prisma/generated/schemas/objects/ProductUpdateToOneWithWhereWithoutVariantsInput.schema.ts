import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductUpdateWithoutVariantsInputObjectSchema } from './ProductUpdateWithoutVariantsInput.schema';
import { ProductUncheckedUpdateWithoutVariantsInputObjectSchema } from './ProductUncheckedUpdateWithoutVariantsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional().nullable(),
  data: z.union([z.lazy(() => ProductUpdateWithoutVariantsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutVariantsInputObjectSchema)])
}).strict();
export const ProductUpdateToOneWithWhereWithoutVariantsInputObjectSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutVariantsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutVariantsInput>;
export const ProductUpdateToOneWithWhereWithoutVariantsInputObjectZodSchema = makeSchema();
