import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { CompanyFindManySchema } from '../findManyCompany.schema';
import { VariantFindManySchema } from '../findManyVariant.schema';
import { ProductCountOutputTypeArgsObjectSchema } from './ProductCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  companies: z.union([z.boolean(), z.lazy(() => CompanyFindManySchema)]).optional().nullable(),
  variants: z.union([z.boolean(), z.lazy(() => VariantFindManySchema)]).optional().nullable(),
  _count: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeArgsObjectSchema)]).optional().nullable()
}).strict();
export const ProductIncludeObjectSchema: z.ZodType<Prisma.ProductInclude> = makeSchema() as unknown as z.ZodType<Prisma.ProductInclude>;
export const ProductIncludeObjectZodSchema = makeSchema();
