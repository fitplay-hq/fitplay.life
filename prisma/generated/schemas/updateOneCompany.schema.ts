import { z } from 'zod';
import { CompanySelectObjectSchema } from './objects/CompanySelect.schema';
import { CompanyIncludeObjectSchema } from './objects/CompanyInclude.schema';
import { CompanyUpdateInputObjectSchema } from './objects/CompanyUpdateInput.schema';
import { CompanyUncheckedUpdateInputObjectSchema } from './objects/CompanyUncheckedUpdateInput.schema';
import { CompanyWhereUniqueInputObjectSchema } from './objects/CompanyWhereUniqueInput.schema';

export const CompanyUpdateOneSchema = z.object({ select: CompanySelectObjectSchema.optional(), include: CompanyIncludeObjectSchema.optional(), data: z.union([CompanyUpdateInputObjectSchema, CompanyUncheckedUpdateInputObjectSchema]), where: CompanyWhereUniqueInputObjectSchema  })