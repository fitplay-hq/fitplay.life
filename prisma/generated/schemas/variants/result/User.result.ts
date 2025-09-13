import { z } from 'zod';

import { RoleSchema } from '../../enums/Role.schema';
import { GenderSchema } from '../../enums/Gender.schema';
// prettier-ignore
export const UserResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    role: RoleSchema,
    gender: GenderSchema.nullable(),
    birthDate: z.date().nullable(),
    company: z.unknown(),
    companyId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    verified: z.boolean()
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
