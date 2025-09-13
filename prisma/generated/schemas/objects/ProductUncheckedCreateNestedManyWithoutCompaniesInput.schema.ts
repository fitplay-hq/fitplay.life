import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductCreateWithoutCompaniesInputObjectSchema } from './ProductCreateWithoutCompaniesInput.schema';
import { ProductUncheckedCreateWithoutCompaniesInputObjectSchema } from './ProductUncheckedCreateWithoutCompaniesInput.schema';
import { ProductCreateOrConnectWithoutCompaniesInputObjectSchema } from './ProductCreateOrConnectWithoutCompaniesInput.schema';
import { ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutCompaniesInputObjectSchema), z.lazy(() => ProductCreateWithoutCompaniesInputObjectSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutCompaniesInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCompaniesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCreateOrConnectWithoutCompaniesInputObjectSchema), z.lazy(() => ProductCreateOrConnectWithoutCompaniesInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProductUncheckedCreateNestedManyWithoutCompaniesInputObjectSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutCompaniesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutCompaniesInput>;
export const ProductUncheckedCreateNestedManyWithoutCompaniesInputObjectZodSchema = makeSchema();
