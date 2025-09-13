import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserFindManySchema } from '../findManyUser.schema';
import { ProductFindManySchema } from '../findManyProduct.schema';
import { CompanyCountOutputTypeArgsObjectSchema } from './CompanyCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  users: z.union([z.boolean(), z.lazy(() => UserFindManySchema)]).optional().nullable(),
  products: z.union([z.boolean(), z.lazy(() => ProductFindManySchema)]).optional().nullable(),
  _count: z.union([z.boolean(), z.lazy(() => CompanyCountOutputTypeArgsObjectSchema)]).optional().nullable()
}).strict();
export const CompanyIncludeObjectSchema: z.ZodType<Prisma.CompanyInclude> = makeSchema() as unknown as z.ZodType<Prisma.CompanyInclude>;
export const CompanyIncludeObjectZodSchema = makeSchema();
