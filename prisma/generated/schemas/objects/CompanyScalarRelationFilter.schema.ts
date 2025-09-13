import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyWhereInputObjectSchema } from './CompanyWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  is: z.lazy(() => CompanyWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => CompanyWhereInputObjectSchema).optional().nullable()
}).strict();
export const CompanyScalarRelationFilterObjectSchema: z.ZodType<Prisma.CompanyScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CompanyScalarRelationFilter>;
export const CompanyScalarRelationFilterObjectZodSchema = makeSchema();
