import { z } from 'zod';
import { CompanySelectObjectSchema } from './objects/CompanySelect.schema';
import { CompanyUpdateManyMutationInputObjectSchema } from './objects/CompanyUpdateManyMutationInput.schema';
import { CompanyWhereInputObjectSchema } from './objects/CompanyWhereInput.schema';

export const CompanyUpdateManyAndReturnSchema = z.object({ select: CompanySelectObjectSchema.optional(), data: CompanyUpdateManyMutationInputObjectSchema, where: CompanyWhereInputObjectSchema.optional()  }).strict()