import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  name: z.string().max(50),
  address: z.string().max(100),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const CompanyCreateManyInputObjectSchema: z.ZodType<Prisma.CompanyCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyCreateManyInput>;
export const CompanyCreateManyInputObjectZodSchema = makeSchema();
