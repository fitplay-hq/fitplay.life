import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyWhereUniqueInputObjectSchema } from './CompanyWhereUniqueInput.schema';
import { CompanyCreateWithoutProductsInputObjectSchema } from './CompanyCreateWithoutProductsInput.schema';
import { CompanyUncheckedCreateWithoutProductsInputObjectSchema } from './CompanyUncheckedCreateWithoutProductsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => CompanyWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CompanyCreateWithoutProductsInputObjectSchema), z.lazy(() => CompanyUncheckedCreateWithoutProductsInputObjectSchema)])
}).strict();
export const CompanyCreateOrConnectWithoutProductsInputObjectSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyCreateOrConnectWithoutProductsInput>;
export const CompanyCreateOrConnectWithoutProductsInputObjectZodSchema = makeSchema();
