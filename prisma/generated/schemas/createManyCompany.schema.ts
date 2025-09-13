import { z } from 'zod';
import { CompanyCreateManyInputObjectSchema } from './objects/CompanyCreateManyInput.schema';

export const CompanyCreateManySchema = z.object({ data: z.union([ CompanyCreateManyInputObjectSchema, z.array(CompanyCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })