import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  OR: z.lazy(makeSchema).array().optional().nullable(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  identifier: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  token: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  expires: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const VerificationTokenScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput>;
export const VerificationTokenScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
