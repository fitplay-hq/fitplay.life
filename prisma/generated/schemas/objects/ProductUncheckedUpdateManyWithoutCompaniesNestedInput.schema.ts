import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductCreateWithoutCompaniesInputObjectSchema } from './ProductCreateWithoutCompaniesInput.schema';
import { ProductUncheckedCreateWithoutCompaniesInputObjectSchema } from './ProductUncheckedCreateWithoutCompaniesInput.schema';
import { ProductCreateOrConnectWithoutCompaniesInputObjectSchema } from './ProductCreateOrConnectWithoutCompaniesInput.schema';
import { ProductUpsertWithWhereUniqueWithoutCompaniesInputObjectSchema } from './ProductUpsertWithWhereUniqueWithoutCompaniesInput.schema';
import { ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateWithWhereUniqueWithoutCompaniesInputObjectSchema } from './ProductUpdateWithWhereUniqueWithoutCompaniesInput.schema';
import { ProductUpdateManyWithWhereWithoutCompaniesInputObjectSchema } from './ProductUpdateManyWithWhereWithoutCompaniesInput.schema';
import { ProductScalarWhereInputObjectSchema } from './ProductScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutCompaniesInputObjectSchema), z.lazy(() => ProductCreateWithoutCompaniesInputObjectSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutCompaniesInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCompaniesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCreateOrConnectWithoutCompaniesInputObjectSchema), z.lazy(() => ProductCreateOrConnectWithoutCompaniesInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductUpsertWithWhereUniqueWithoutCompaniesInputObjectSchema), z.lazy(() => ProductUpsertWithWhereUniqueWithoutCompaniesInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductUpdateWithWhereUniqueWithoutCompaniesInputObjectSchema), z.lazy(() => ProductUpdateWithWhereUniqueWithoutCompaniesInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductUpdateManyWithWhereWithoutCompaniesInputObjectSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutCompaniesInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductScalarWhereInputObjectSchema), z.lazy(() => ProductScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProductUncheckedUpdateManyWithoutCompaniesNestedInputObjectSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutCompaniesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutCompaniesNestedInput>;
export const ProductUncheckedUpdateManyWithoutCompaniesNestedInputObjectZodSchema = makeSchema();
