import { z } from 'zod';
import { VariantSelectObjectSchema } from './objects/VariantSelect.schema';
import { VariantUpdateManyMutationInputObjectSchema } from './objects/VariantUpdateManyMutationInput.schema';
import { VariantWhereInputObjectSchema } from './objects/VariantWhereInput.schema';

export const VariantUpdateManyAndReturnSchema = z.object({ select: VariantSelectObjectSchema.optional(), data: VariantUpdateManyMutationInputObjectSchema, where: VariantWhereInputObjectSchema.optional()  }).strict()