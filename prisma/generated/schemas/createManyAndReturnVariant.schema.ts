import { z } from 'zod';
import { VariantSelectObjectSchema } from './objects/VariantSelect.schema';
import { VariantCreateManyInputObjectSchema } from './objects/VariantCreateManyInput.schema';

export const VariantCreateManyAndReturnSchema = z.object({ select: VariantSelectObjectSchema.optional(), data: z.union([ VariantCreateManyInputObjectSchema, z.array(VariantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()