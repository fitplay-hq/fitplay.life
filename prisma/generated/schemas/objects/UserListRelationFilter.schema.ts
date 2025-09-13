import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => UserWhereInputObjectSchema).optional().nullable(),
  some: z.lazy(() => UserWhereInputObjectSchema).optional().nullable(),
  none: z.lazy(() => UserWhereInputObjectSchema).optional().nullable()
}).strict();
export const UserListRelationFilterObjectSchema: z.ZodType<Prisma.UserListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.UserListRelationFilter>;
export const UserListRelationFilterObjectZodSchema = makeSchema();
