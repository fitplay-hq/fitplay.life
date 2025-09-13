import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  users: z.boolean().optional().nullable(),
  products: z.boolean().optional().nullable()
}).strict();
export const CompanyCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CompanyCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CompanyCountOutputTypeSelect>;
export const CompanyCountOutputTypeSelectObjectZodSchema = makeSchema();
