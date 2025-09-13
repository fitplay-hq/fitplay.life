import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserSelectObjectSchema } from './UserSelect.schema';
import { UserIncludeObjectSchema } from './UserInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => UserSelectObjectSchema).optional().nullable(),
  include: z.lazy(() => UserIncludeObjectSchema).optional().nullable()
}).strict();
export const UserArgsObjectSchema = makeSchema();
export const UserArgsObjectZodSchema = makeSchema();
