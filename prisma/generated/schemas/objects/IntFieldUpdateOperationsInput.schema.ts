import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.number().int().optional(),
  increment: z.number().int().optional().nullable(),
  decrement: z.number().int().optional().nullable(),
  multiply: z.number().int().optional().nullable(),
  divide: z.number().int().optional().nullable()
}).strict();
export const IntFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.IntFieldUpdateOperationsInput>;
export const IntFieldUpdateOperationsInputObjectZodSchema = makeSchema();
