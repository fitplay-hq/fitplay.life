import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductCreateWithoutVariantsInputObjectSchema } from './ProductCreateWithoutVariantsInput.schema';
import { ProductUncheckedCreateWithoutVariantsInputObjectSchema } from './ProductUncheckedCreateWithoutVariantsInput.schema';
import { ProductCreateOrConnectWithoutVariantsInputObjectSchema } from './ProductCreateOrConnectWithoutVariantsInput.schema';
import { ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutVariantsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutVariantsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutVariantsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductCreateNestedOneWithoutVariantsInputObjectSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutVariantsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateNestedOneWithoutVariantsInput>;
export const ProductCreateNestedOneWithoutVariantsInputObjectZodSchema = makeSchema();
