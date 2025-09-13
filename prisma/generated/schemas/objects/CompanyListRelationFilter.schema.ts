import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyWhereInputObjectSchema } from './CompanyWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => CompanyWhereInputObjectSchema).optional().nullable(),
  some: z.lazy(() => CompanyWhereInputObjectSchema).optional().nullable(),
  none: z.lazy(() => CompanyWhereInputObjectSchema).optional().nullable()
}).strict();
export const CompanyListRelationFilterObjectSchema: z.ZodType<Prisma.CompanyListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CompanyListRelationFilter>;
export const CompanyListRelationFilterObjectZodSchema = makeSchema();
