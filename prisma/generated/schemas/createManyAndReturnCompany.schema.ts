import { z } from 'zod';
import { CompanySelectObjectSchema } from './objects/CompanySelect.schema';
import { CompanyCreateManyInputObjectSchema } from './objects/CompanyCreateManyInput.schema';

export const CompanyCreateManyAndReturnSchema = z.object({ select: CompanySelectObjectSchema.optional(), data: z.union([ CompanyCreateManyInputObjectSchema, z.array(CompanyCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()