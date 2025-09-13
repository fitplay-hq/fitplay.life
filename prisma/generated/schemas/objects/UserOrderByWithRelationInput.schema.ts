import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CompanyOrderByWithRelationInputObjectSchema } from './CompanyOrderByWithRelationInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  name: SortOrderSchema.optional().nullable(),
  email: SortOrderSchema.optional().nullable(),
  password: SortOrderSchema.optional().nullable(),
  phone: SortOrderSchema.optional().nullable(),
  role: SortOrderSchema.optional().nullable(),
  gender: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional().nullable(),
  birthDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional().nullable(),
  companyId: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  updatedAt: SortOrderSchema.optional().nullable(),
  verified: SortOrderSchema.optional().nullable(),
  company: z.lazy(() => CompanyOrderByWithRelationInputObjectSchema).optional().nullable()
}).strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
