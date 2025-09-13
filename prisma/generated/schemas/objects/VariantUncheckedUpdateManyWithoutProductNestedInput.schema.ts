import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { VariantCreateWithoutProductInputObjectSchema } from './VariantCreateWithoutProductInput.schema';
import { VariantUncheckedCreateWithoutProductInputObjectSchema } from './VariantUncheckedCreateWithoutProductInput.schema';
import { VariantCreateOrConnectWithoutProductInputObjectSchema } from './VariantCreateOrConnectWithoutProductInput.schema';
import { VariantUpsertWithWhereUniqueWithoutProductInputObjectSchema } from './VariantUpsertWithWhereUniqueWithoutProductInput.schema';
import { VariantCreateManyProductInputEnvelopeObjectSchema } from './VariantCreateManyProductInputEnvelope.schema';
import { VariantWhereUniqueInputObjectSchema } from './VariantWhereUniqueInput.schema';
import { VariantUpdateWithWhereUniqueWithoutProductInputObjectSchema } from './VariantUpdateWithWhereUniqueWithoutProductInput.schema';
import { VariantUpdateManyWithWhereWithoutProductInputObjectSchema } from './VariantUpdateManyWithWhereWithoutProductInput.schema';
import { VariantScalarWhereInputObjectSchema } from './VariantScalarWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => VariantCreateWithoutProductInputObjectSchema), z.lazy(() => VariantCreateWithoutProductInputObjectSchema).array(), z.lazy(() => VariantUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => VariantUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => VariantCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => VariantCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => VariantUpsertWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => VariantUpsertWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => VariantCreateManyProductInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => VariantWhereUniqueInputObjectSchema), z.lazy(() => VariantWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => VariantWhereUniqueInputObjectSchema), z.lazy(() => VariantWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => VariantWhereUniqueInputObjectSchema), z.lazy(() => VariantWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => VariantWhereUniqueInputObjectSchema), z.lazy(() => VariantWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => VariantUpdateWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => VariantUpdateWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => VariantUpdateManyWithWhereWithoutProductInputObjectSchema), z.lazy(() => VariantUpdateManyWithWhereWithoutProductInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => VariantScalarWhereInputObjectSchema), z.lazy(() => VariantScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const VariantUncheckedUpdateManyWithoutProductNestedInputObjectSchema: z.ZodType<Prisma.VariantUncheckedUpdateManyWithoutProductNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantUncheckedUpdateManyWithoutProductNestedInput>;
export const VariantUncheckedUpdateManyWithoutProductNestedInputObjectZodSchema = makeSchema();
