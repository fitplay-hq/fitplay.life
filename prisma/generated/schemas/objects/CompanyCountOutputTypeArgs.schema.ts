import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyCountOutputTypeSelectObjectSchema } from './CompanyCountOutputTypeSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => CompanyCountOutputTypeSelectObjectSchema).optional().nullable()
}).strict();
export const CompanyCountOutputTypeArgsObjectSchema = makeSchema();
export const CompanyCountOutputTypeArgsObjectZodSchema = makeSchema();
