import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SubCategorySchema } from '../enums/SubCategory.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  set: SubCategorySchema.optional()
}).strict();
export const NullableEnumSubCategoryFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumSubCategoryFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumSubCategoryFieldUpdateOperationsInput>;
export const NullableEnumSubCategoryFieldUpdateOperationsInputObjectZodSchema = makeSchema();
