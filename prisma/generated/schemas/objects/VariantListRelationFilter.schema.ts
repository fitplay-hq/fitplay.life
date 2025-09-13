import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { VariantWhereInputObjectSchema } from './VariantWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => VariantWhereInputObjectSchema).optional().nullable(),
  some: z.lazy(() => VariantWhereInputObjectSchema).optional().nullable(),
  none: z.lazy(() => VariantWhereInputObjectSchema).optional().nullable()
}).strict();
export const VariantListRelationFilterObjectSchema: z.ZodType<Prisma.VariantListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.VariantListRelationFilter>;
export const VariantListRelationFilterObjectZodSchema = makeSchema();
