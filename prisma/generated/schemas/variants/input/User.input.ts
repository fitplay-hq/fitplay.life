import { z } from 'zod';

import { RoleSchema } from '../../enums/Role.schema';
import { GenderSchema } from '../../enums/Gender.schema';
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    role: RoleSchema,
    gender: GenderSchema.optional().nullable(),
    birthDate: z.date().optional().nullable(),
    company: z.unknown(),
    companyId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    verified: z.boolean()
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
