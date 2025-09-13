import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyArgsObjectSchema } from './CompanyArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  company: z.union([z.boolean(), z.lazy(() => CompanyArgsObjectSchema)]).optional().nullable()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
