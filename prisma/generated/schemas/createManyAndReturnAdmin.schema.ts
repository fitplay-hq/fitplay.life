import { z } from 'zod';
import { AdminSelectObjectSchema } from './objects/AdminSelect.schema';
import { AdminCreateManyInputObjectSchema } from './objects/AdminCreateManyInput.schema';

export const AdminCreateManyAndReturnSchema = z.object({ select: AdminSelectObjectSchema.optional(), data: z.union([ AdminCreateManyInputObjectSchema, z.array(AdminCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()