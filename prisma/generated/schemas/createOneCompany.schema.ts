import { z } from 'zod';
import { CompanySelectObjectSchema } from './objects/CompanySelect.schema';
import { CompanyIncludeObjectSchema } from './objects/CompanyInclude.schema';
import { CompanyCreateInputObjectSchema } from './objects/CompanyCreateInput.schema';
import { CompanyUncheckedCreateInputObjectSchema } from './objects/CompanyUncheckedCreateInput.schema';

export const CompanyCreateOneSchema = z.object({ select: CompanySelectObjectSchema.optional(), include: CompanyIncludeObjectSchema.optional(), data: z.union([CompanyCreateInputObjectSchema, CompanyUncheckedCreateInputObjectSchema])  })