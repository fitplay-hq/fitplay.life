import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutCompaniesInputObjectSchema } from './ProductCreateWithoutCompaniesInput.schema';
import { ProductUncheckedCreateWithoutCompaniesInputObjectSchema } from './ProductUncheckedCreateWithoutCompaniesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutCompaniesInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCompaniesInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutCompaniesInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutCompaniesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutCompaniesInput>;
export const ProductCreateOrConnectWithoutCompaniesInputObjectZodSchema = makeSchema();
