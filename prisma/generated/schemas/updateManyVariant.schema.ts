import { z } from 'zod';
import { VariantUpdateManyMutationInputObjectSchema } from './objects/VariantUpdateManyMutationInput.schema';
import { VariantWhereInputObjectSchema } from './objects/VariantWhereInput.schema';

export const VariantUpdateManySchema = z.object({ data: VariantUpdateManyMutationInputObjectSchema, where: VariantWhereInputObjectSchema.optional()  })