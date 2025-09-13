import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { VariantCreateWithoutProductInputObjectSchema } from './VariantCreateWithoutProductInput.schema';
import { VariantUncheckedCreateWithoutProductInputObjectSchema } from './VariantUncheckedCreateWithoutProductInput.schema';
import { VariantCreateOrConnectWithoutProductInputObjectSchema } from './VariantCreateOrConnectWithoutProductInput.schema';
import { VariantCreateManyProductInputEnvelopeObjectSchema } from './VariantCreateManyProductInputEnvelope.schema';
import { VariantWhereUniqueInputObjectSchema } from './VariantWhereUniqueInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => VariantCreateWithoutProductInputObjectSchema), z.lazy(() => VariantCreateWithoutProductInputObjectSchema).array(), z.lazy(() => VariantUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => VariantUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => VariantCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => VariantCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => VariantCreateManyProductInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => VariantWhereUniqueInputObjectSchema), z.lazy(() => VariantWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const VariantCreateNestedManyWithoutProductInputObjectSchema: z.ZodType<Prisma.VariantCreateNestedManyWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantCreateNestedManyWithoutProductInput>;
export const VariantCreateNestedManyWithoutProductInputObjectZodSchema = makeSchema();
