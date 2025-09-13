import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { VariantCreateManyProductInputObjectSchema } from './VariantCreateManyProductInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => VariantCreateManyProductInputObjectSchema), z.lazy(() => VariantCreateManyProductInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional().nullable()
}).strict();
export const VariantCreateManyProductInputEnvelopeObjectSchema: z.ZodType<Prisma.VariantCreateManyProductInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.VariantCreateManyProductInputEnvelope>;
export const VariantCreateManyProductInputEnvelopeObjectZodSchema = makeSchema();
