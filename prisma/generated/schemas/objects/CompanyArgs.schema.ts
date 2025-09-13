import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanySelectObjectSchema } from './CompanySelect.schema';
import { CompanyIncludeObjectSchema } from './CompanyInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => CompanySelectObjectSchema).optional().nullable(),
  include: z.lazy(() => CompanyIncludeObjectSchema).optional().nullable()
}).strict();
export const CompanyArgsObjectSchema = makeSchema();
export const CompanyArgsObjectZodSchema = makeSchema();
