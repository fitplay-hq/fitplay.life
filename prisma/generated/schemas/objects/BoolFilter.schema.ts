import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { NestedBoolFilterObjectSchema } from './NestedBoolFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterObjectSchema)]).optional().nullable()
}).strict();
export const BoolFilterObjectSchema: z.ZodType<Prisma.BoolFilter> = makeSchema() as unknown as z.ZodType<Prisma.BoolFilter>;
export const BoolFilterObjectZodSchema = makeSchema();
