import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateManyWithoutCompanyNestedInputObjectSchema } from './UserUpdateManyWithoutCompanyNestedInput.schema';
import { ProductUpdateManyWithoutCompaniesNestedInputObjectSchema } from './ProductUpdateManyWithoutCompaniesNestedInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  name: z.union([z.string().max(50), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  address: z.union([z.string().max(100), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  users: z.lazy(() => UserUpdateManyWithoutCompanyNestedInputObjectSchema).optional().nullable(),
  products: z.lazy(() => ProductUpdateManyWithoutCompaniesNestedInputObjectSchema).optional().nullable()
}).strict();
export const CompanyUpdateInputObjectSchema: z.ZodType<Prisma.CompanyUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyUpdateInput>;
export const CompanyUpdateInputObjectZodSchema = makeSchema();
