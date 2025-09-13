import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { AdminSelectObjectSchema } from './AdminSelect.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => AdminSelectObjectSchema).optional().nullable()
}).strict();
export const AdminArgsObjectSchema = makeSchema();
export const AdminArgsObjectZodSchema = makeSchema();
