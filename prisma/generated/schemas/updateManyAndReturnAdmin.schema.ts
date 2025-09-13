import { z } from 'zod';
import { AdminSelectObjectSchema } from './objects/AdminSelect.schema';
import { AdminUpdateManyMutationInputObjectSchema } from './objects/AdminUpdateManyMutationInput.schema';
import { AdminWhereInputObjectSchema } from './objects/AdminWhereInput.schema';

export const AdminUpdateManyAndReturnSchema = z.object({ select: AdminSelectObjectSchema.optional(), data: AdminUpdateManyMutationInputObjectSchema, where: AdminWhereInputObjectSchema.optional()  }).strict()