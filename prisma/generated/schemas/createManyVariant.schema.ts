import { z } from 'zod';
import { VariantCreateManyInputObjectSchema } from './objects/VariantCreateManyInput.schema';

export const VariantCreateManySchema = z.object({ data: z.union([ VariantCreateManyInputObjectSchema, z.array(VariantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })