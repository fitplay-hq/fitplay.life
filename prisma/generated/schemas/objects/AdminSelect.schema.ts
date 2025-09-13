import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional().nullable(),
  name: z.boolean().optional().nullable(),
  email: z.boolean().optional().nullable(),
  password: z.boolean().optional().nullable(),
  role: z.boolean().optional().nullable(),
  createdAt: z.boolean().optional().nullable(),
  updatedAt: z.boolean().optional().nullable()
}).strict();
export const AdminSelectObjectSchema: z.ZodType<Prisma.AdminSelect> = makeSchema() as unknown as z.ZodType<Prisma.AdminSelect>;
export const AdminSelectObjectZodSchema = makeSchema();
