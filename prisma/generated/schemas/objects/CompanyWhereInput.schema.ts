import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserListRelationFilterObjectSchema } from './UserListRelationFilter.schema';
import { ProductListRelationFilterObjectSchema } from './ProductListRelationFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  OR: z.lazy(makeSchema).array().optional().nullable(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional().nullable(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional().nullable(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(50)]).optional().nullable(),
  address: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(100)]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  users: z.lazy(() => UserListRelationFilterObjectSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterObjectSchema).optional()
}).strict();
export const CompanyWhereInputObjectSchema: z.ZodType<Prisma.CompanyWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyWhereInput>;
export const CompanyWhereInputObjectZodSchema = makeSchema();
