import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { GenderSchema } from '../enums/Gender.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  set: GenderSchema.optional()
}).strict();
export const NullableEnumGenderFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumGenderFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumGenderFieldUpdateOperationsInput>;
export const NullableEnumGenderFieldUpdateOperationsInputObjectZodSchema = makeSchema();
