import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  set: z.string().array()
}).strict();
export const ProductCreateimagesInputObjectSchema: z.ZodType<Prisma.ProductCreateimagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateimagesInput>;
export const ProductCreateimagesInputObjectZodSchema = makeSchema();
