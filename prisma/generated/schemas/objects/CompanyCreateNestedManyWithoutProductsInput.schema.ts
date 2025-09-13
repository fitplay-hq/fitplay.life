import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyCreateWithoutProductsInputObjectSchema } from './CompanyCreateWithoutProductsInput.schema';
import { CompanyUncheckedCreateWithoutProductsInputObjectSchema } from './CompanyUncheckedCreateWithoutProductsInput.schema';
import { CompanyCreateOrConnectWithoutProductsInputObjectSchema } from './CompanyCreateOrConnectWithoutProductsInput.schema';
import { CompanyWhereUniqueInputObjectSchema } from './CompanyWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => CompanyCreateWithoutProductsInputObjectSchema), z.lazy(() => CompanyCreateWithoutProductsInputObjectSchema).array(), z.lazy(() => CompanyUncheckedCreateWithoutProductsInputObjectSchema), z.lazy(() => CompanyUncheckedCreateWithoutProductsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompanyCreateOrConnectWithoutProductsInputObjectSchema), z.lazy(() => CompanyCreateOrConnectWithoutProductsInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CompanyWhereUniqueInputObjectSchema), z.lazy(() => CompanyWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CompanyCreateNestedManyWithoutProductsInputObjectSchema: z.ZodType<Prisma.CompanyCreateNestedManyWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyCreateNestedManyWithoutProductsInput>;
export const CompanyCreateNestedManyWithoutProductsInputObjectZodSchema = makeSchema();
