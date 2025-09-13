import { z } from 'zod';
import { CompanySelectObjectSchema } from './objects/CompanySelect.schema';
import { CompanyIncludeObjectSchema } from './objects/CompanyInclude.schema';
import { CompanyWhereUniqueInputObjectSchema } from './objects/CompanyWhereUniqueInput.schema';
import { CompanyCreateInputObjectSchema } from './objects/CompanyCreateInput.schema';
import { CompanyUncheckedCreateInputObjectSchema } from './objects/CompanyUncheckedCreateInput.schema';
import { CompanyUpdateInputObjectSchema } from './objects/CompanyUpdateInput.schema';
import { CompanyUncheckedUpdateInputObjectSchema } from './objects/CompanyUncheckedUpdateInput.schema';

export const CompanyUpsertSchema = z.object({ select: CompanySelectObjectSchema.optional(), include: CompanyIncludeObjectSchema.optional(), where: CompanyWhereUniqueInputObjectSchema, create: z.union([ CompanyCreateInputObjectSchema, CompanyUncheckedCreateInputObjectSchema ]), update: z.union([ CompanyUpdateInputObjectSchema, CompanyUncheckedUpdateInputObjectSchema ])  })