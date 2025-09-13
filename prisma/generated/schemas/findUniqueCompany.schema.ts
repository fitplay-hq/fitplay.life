import { z } from 'zod';
import { CompanySelectObjectSchema } from './objects/CompanySelect.schema';
import { CompanyIncludeObjectSchema } from './objects/CompanyInclude.schema';
import { CompanyWhereUniqueInputObjectSchema } from './objects/CompanyWhereUniqueInput.schema';

export const CompanyFindUniqueSchema = z.object({ select: CompanySelectObjectSchema.optional(), include: CompanyIncludeObjectSchema.optional(), where: CompanyWhereUniqueInputObjectSchema })