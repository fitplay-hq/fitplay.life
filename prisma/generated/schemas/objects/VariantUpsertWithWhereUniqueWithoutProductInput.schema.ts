import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { VariantWhereUniqueInputObjectSchema } from './VariantWhereUniqueInput.schema';
import { VariantUpdateWithoutProductInputObjectSchema } from './VariantUpdateWithoutProductInput.schema';
import { VariantUncheckedUpdateWithoutProductInputObjectSchema } from './VariantUncheckedUpdateWithoutProductInput.schema';
import { VariantCreateWithoutProductInputObjectSchema } from './VariantCreateWithoutProductInput.schema';
import { VariantUncheckedCreateWithoutProductInputObjectSchema } from './VariantUncheckedCreateWithoutProductInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => VariantWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => VariantUpdateWithoutProductInputObjectSchema), z.lazy(() => VariantUncheckedUpdateWithoutProductInputObjectSchema)]),
  create: z.union([z.lazy(() => VariantCreateWithoutProductInputObjectSchema), z.lazy(() => VariantUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const VariantUpsertWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.VariantUpsertWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantUpsertWithWhereUniqueWithoutProductInput>;
export const VariantUpsertWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
