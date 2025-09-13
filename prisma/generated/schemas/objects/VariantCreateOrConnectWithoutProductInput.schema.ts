import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { VariantWhereUniqueInputObjectSchema } from './VariantWhereUniqueInput.schema';
import { VariantCreateWithoutProductInputObjectSchema } from './VariantCreateWithoutProductInput.schema';
import { VariantUncheckedCreateWithoutProductInputObjectSchema } from './VariantUncheckedCreateWithoutProductInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => VariantWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => VariantCreateWithoutProductInputObjectSchema), z.lazy(() => VariantUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const VariantCreateOrConnectWithoutProductInputObjectSchema: z.ZodType<Prisma.VariantCreateOrConnectWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantCreateOrConnectWithoutProductInput>;
export const VariantCreateOrConnectWithoutProductInputObjectZodSchema = makeSchema();
