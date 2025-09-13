import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductScalarWhereInputObjectSchema } from './ProductScalarWhereInput.schema';
import { ProductUpdateManyMutationInputObjectSchema } from './ProductUpdateManyMutationInput.schema';
import { ProductUncheckedUpdateManyWithoutCompaniesInputObjectSchema } from './ProductUncheckedUpdateManyWithoutCompaniesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ProductScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProductUpdateManyMutationInputObjectSchema), z.lazy(() => ProductUncheckedUpdateManyWithoutCompaniesInputObjectSchema)])
}).strict();
export const ProductUpdateManyWithWhereWithoutCompaniesInputObjectSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutCompaniesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutCompaniesInput>;
export const ProductUpdateManyWithWhereWithoutCompaniesInputObjectZodSchema = makeSchema();
