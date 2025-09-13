import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductCreateWithoutVariantsInputObjectSchema } from './ProductCreateWithoutVariantsInput.schema';
import { ProductUncheckedCreateWithoutVariantsInputObjectSchema } from './ProductUncheckedCreateWithoutVariantsInput.schema';
import { ProductCreateOrConnectWithoutVariantsInputObjectSchema } from './ProductCreateOrConnectWithoutVariantsInput.schema';
import { ProductUpsertWithoutVariantsInputObjectSchema } from './ProductUpsertWithoutVariantsInput.schema';
import { ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateToOneWithWhereWithoutVariantsInputObjectSchema } from './ProductUpdateToOneWithWhereWithoutVariantsInput.schema';
import { ProductUpdateWithoutVariantsInputObjectSchema } from './ProductUpdateWithoutVariantsInput.schema';
import { ProductUncheckedUpdateWithoutVariantsInputObjectSchema } from './ProductUncheckedUpdateWithoutVariantsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutVariantsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutVariantsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutVariantsInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutVariantsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateToOneWithWhereWithoutVariantsInputObjectSchema), z.lazy(() => ProductUpdateWithoutVariantsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutVariantsInputObjectSchema)]).optional()
}).strict();
export const ProductUpdateOneRequiredWithoutVariantsNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutVariantsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateOneRequiredWithoutVariantsNestedInput>;
export const ProductUpdateOneRequiredWithoutVariantsNestedInputObjectZodSchema = makeSchema();
