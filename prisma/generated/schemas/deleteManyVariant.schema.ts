import { z } from 'zod';
import { VariantWhereInputObjectSchema } from './objects/VariantWhereInput.schema';

export const VariantDeleteManySchema = z.object({ where: VariantWhereInputObjectSchema.optional()  })