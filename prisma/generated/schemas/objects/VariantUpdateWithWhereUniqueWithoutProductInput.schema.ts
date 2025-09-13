import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { VariantWhereUniqueInputObjectSchema } from './VariantWhereUniqueInput.schema';
import { VariantUpdateWithoutProductInputObjectSchema } from './VariantUpdateWithoutProductInput.schema';
import { VariantUncheckedUpdateWithoutProductInputObjectSchema } from './VariantUncheckedUpdateWithoutProductInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => VariantWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => VariantUpdateWithoutProductInputObjectSchema), z.lazy(() => VariantUncheckedUpdateWithoutProductInputObjectSchema)])
}).strict();
export const VariantUpdateWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.VariantUpdateWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantUpdateWithWhereUniqueWithoutProductInput>;
export const VariantUpdateWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
