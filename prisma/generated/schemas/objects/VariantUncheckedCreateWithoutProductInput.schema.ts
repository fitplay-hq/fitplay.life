import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  variantCategory: z.string(),
  variantValue: z.string(),
  mrp: z.number().int(),
  credits: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const VariantUncheckedCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.VariantUncheckedCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantUncheckedCreateWithoutProductInput>;
export const VariantUncheckedCreateWithoutProductInputObjectZodSchema = makeSchema();
