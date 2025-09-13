import { z } from 'zod';
import { VariantSelectObjectSchema } from './objects/VariantSelect.schema';
import { VariantIncludeObjectSchema } from './objects/VariantInclude.schema';
import { VariantUpdateInputObjectSchema } from './objects/VariantUpdateInput.schema';
import { VariantUncheckedUpdateInputObjectSchema } from './objects/VariantUncheckedUpdateInput.schema';
import { VariantWhereUniqueInputObjectSchema } from './objects/VariantWhereUniqueInput.schema';

export const VariantUpdateOneSchema = z.object({ select: VariantSelectObjectSchema.optional(), include: VariantIncludeObjectSchema.optional(), data: z.union([VariantUpdateInputObjectSchema, VariantUncheckedUpdateInputObjectSchema]), where: VariantWhereUniqueInputObjectSchema  })