import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.string().array().optional(),
  push: z.union([z.string(), z.string().array()]).optional().nullable()
}).strict();
export const ProductUpdatetagsInputObjectSchema: z.ZodType<Prisma.ProductUpdatetagsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdatetagsInput>;
export const ProductUpdatetagsInputObjectZodSchema = makeSchema();
