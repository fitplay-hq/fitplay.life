import { z } from 'zod';
import { VariantSelectObjectSchema } from './objects/VariantSelect.schema';
import { VariantIncludeObjectSchema } from './objects/VariantInclude.schema';
import { VariantWhereUniqueInputObjectSchema } from './objects/VariantWhereUniqueInput.schema';

export const VariantDeleteOneSchema = z.object({ select: VariantSelectObjectSchema.optional(), include: VariantIncludeObjectSchema.optional(), where: VariantWhereUniqueInputObjectSchema  })