import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { UserCreateManyCompanyInputObjectSchema } from './UserCreateManyCompanyInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => UserCreateManyCompanyInputObjectSchema), z.lazy(() => UserCreateManyCompanyInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional().nullable()
}).strict();
export const UserCreateManyCompanyInputEnvelopeObjectSchema: z.ZodType<Prisma.UserCreateManyCompanyInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateManyCompanyInputEnvelope>;
export const UserCreateManyCompanyInputEnvelopeObjectZodSchema = makeSchema();
