import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.number().optional(),
  increment: z.number().optional().nullable(),
  decrement: z.number().optional().nullable(),
  multiply: z.number().optional().nullable(),
  divide: z.number().optional().nullable()
}).strict();
export const NullableFloatFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput>;
export const NullableFloatFieldUpdateOperationsInputObjectZodSchema = makeSchema();
