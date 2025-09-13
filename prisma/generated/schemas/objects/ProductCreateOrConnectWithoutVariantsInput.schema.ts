import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutVariantsInputObjectSchema } from './ProductCreateWithoutVariantsInput.schema';
import { ProductUncheckedCreateWithoutVariantsInputObjectSchema } from './ProductUncheckedCreateWithoutVariantsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutVariantsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutVariantsInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutVariantsInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutVariantsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutVariantsInput>;
export const ProductCreateOrConnectWithoutVariantsInputObjectZodSchema = makeSchema();
