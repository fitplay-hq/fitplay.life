import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  OR: z.lazy(makeSchema).array().optional().nullable(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  identifier: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  token: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  expires: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const VerificationTokenWhereInputObjectSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenWhereInput>;
export const VerificationTokenWhereInputObjectZodSchema = makeSchema();
