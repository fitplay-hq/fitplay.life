import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { VariantScalarWhereInputObjectSchema } from './VariantScalarWhereInput.schema';
import { VariantUpdateManyMutationInputObjectSchema } from './VariantUpdateManyMutationInput.schema';
import { VariantUncheckedUpdateManyWithoutProductInputObjectSchema } from './VariantUncheckedUpdateManyWithoutProductInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => VariantScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => VariantUpdateManyMutationInputObjectSchema), z.lazy(() => VariantUncheckedUpdateManyWithoutProductInputObjectSchema)])
}).strict();
export const VariantUpdateManyWithWhereWithoutProductInputObjectSchema: z.ZodType<Prisma.VariantUpdateManyWithWhereWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantUpdateManyWithWhereWithoutProductInput>;
export const VariantUpdateManyWithWhereWithoutProductInputObjectZodSchema = makeSchema();
