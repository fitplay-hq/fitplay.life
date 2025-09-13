import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CategorySchema } from '../enums/Category.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  set: CategorySchema.optional()
}).strict();
export const EnumCategoryFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCategoryFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCategoryFieldUpdateOperationsInput>;
export const EnumCategoryFieldUpdateOperationsInputObjectZodSchema = makeSchema();
