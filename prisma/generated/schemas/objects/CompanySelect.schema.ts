import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserFindManySchema } from '../findManyUser.schema';
import { ProductFindManySchema } from '../findManyProduct.schema';
import { CompanyCountOutputTypeArgsObjectSchema } from './CompanyCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional().nullable(),
  name: z.boolean().optional().nullable(),
  address: z.boolean().optional().nullable(),
  createdAt: z.boolean().optional().nullable(),
  updatedAt: z.boolean().optional().nullable(),
  users: z.union([z.boolean(), z.lazy(() => UserFindManySchema)]).optional().nullable(),
  products: z.union([z.boolean(), z.lazy(() => ProductFindManySchema)]).optional().nullable(),
  _count: z.union([z.boolean(), z.lazy(() => CompanyCountOutputTypeArgsObjectSchema)]).optional().nullable()
}).strict();
export const CompanySelectObjectSchema: z.ZodType<Prisma.CompanySelect> = makeSchema() as unknown as z.ZodType<Prisma.CompanySelect>;
export const CompanySelectObjectZodSchema = makeSchema();
