import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.string().array()
}).strict();
export const ProductCreatetagsInputObjectSchema: z.ZodType<Prisma.ProductCreatetagsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreatetagsInput>;
export const ProductCreatetagsInputObjectZodSchema = makeSchema();
