import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyArgsObjectSchema } from './CompanyArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional().nullable(),
  name: z.boolean().optional().nullable(),
  email: z.boolean().optional().nullable(),
  password: z.boolean().optional().nullable(),
  phone: z.boolean().optional().nullable(),
  role: z.boolean().optional().nullable(),
  gender: z.boolean().optional().nullable(),
  birthDate: z.boolean().optional().nullable(),
  company: z.union([z.boolean(), z.lazy(() => CompanyArgsObjectSchema)]).optional().nullable(),
  companyId: z.boolean().optional().nullable(),
  createdAt: z.boolean().optional().nullable(),
  updatedAt: z.boolean().optional().nullable(),
  verified: z.boolean().optional().nullable()
}).strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
