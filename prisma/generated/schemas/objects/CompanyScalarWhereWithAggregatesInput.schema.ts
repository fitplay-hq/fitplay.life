import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  OR: z.lazy(makeSchema).array().optional().nullable(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(50)]).optional().nullable(),
  address: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const CompanyScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CompanyScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyScalarWhereWithAggregatesInput>;
export const CompanyScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
