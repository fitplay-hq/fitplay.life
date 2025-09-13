import { z } from 'zod';
import { VariantSelectObjectSchema } from './objects/VariantSelect.schema';
import { VariantIncludeObjectSchema } from './objects/VariantInclude.schema';
import { VariantCreateInputObjectSchema } from './objects/VariantCreateInput.schema';
import { VariantUncheckedCreateInputObjectSchema } from './objects/VariantUncheckedCreateInput.schema';

export const VariantCreateOneSchema = z.object({ select: VariantSelectObjectSchema.optional(), include: VariantIncludeObjectSchema.optional(), data: z.union([VariantCreateInputObjectSchema, VariantUncheckedCreateInputObjectSchema])  })