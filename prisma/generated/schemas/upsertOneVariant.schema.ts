import { z } from 'zod';
import { VariantSelectObjectSchema } from './objects/VariantSelect.schema';
import { VariantIncludeObjectSchema } from './objects/VariantInclude.schema';
import { VariantWhereUniqueInputObjectSchema } from './objects/VariantWhereUniqueInput.schema';
import { VariantCreateInputObjectSchema } from './objects/VariantCreateInput.schema';
import { VariantUncheckedCreateInputObjectSchema } from './objects/VariantUncheckedCreateInput.schema';
import { VariantUpdateInputObjectSchema } from './objects/VariantUpdateInput.schema';
import { VariantUncheckedUpdateInputObjectSchema } from './objects/VariantUncheckedUpdateInput.schema';

export const VariantUpsertSchema = z.object({ select: VariantSelectObjectSchema.optional(), include: VariantIncludeObjectSchema.optional(), where: VariantWhereUniqueInputObjectSchema, create: z.union([ VariantCreateInputObjectSchema, VariantUncheckedCreateInputObjectSchema ]), update: z.union([ VariantUpdateInputObjectSchema, VariantUncheckedUpdateInputObjectSchema ])  })