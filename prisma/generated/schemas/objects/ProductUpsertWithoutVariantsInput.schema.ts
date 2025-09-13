import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductUpdateWithoutVariantsInputObjectSchema } from './ProductUpdateWithoutVariantsInput.schema';
import { ProductUncheckedUpdateWithoutVariantsInputObjectSchema } from './ProductUncheckedUpdateWithoutVariantsInput.schema';
import { ProductCreateWithoutVariantsInputObjectSchema } from './ProductCreateWithoutVariantsInput.schema';
import { ProductUncheckedCreateWithoutVariantsInputObjectSchema } from './ProductUncheckedCreateWithoutVariantsInput.schema';
import { ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  update: z.union([z.lazy(() => ProductUpdateWithoutVariantsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutVariantsInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutVariantsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutVariantsInputObjectSchema)]),
  where: z.lazy(() => ProductWhereInputObjectSchema).optional().nullable()
}).strict();
export const ProductUpsertWithoutVariantsInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithoutVariantsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithoutVariantsInput>;
export const ProductUpsertWithoutVariantsInputObjectZodSchema = makeSchema();
