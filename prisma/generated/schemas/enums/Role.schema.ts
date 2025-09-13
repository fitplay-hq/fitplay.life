import { z } from 'zod';

export const RoleSchema = z.enum(['ADMIN', 'HR', 'EMPLOYEE'])

export type Role = z.infer<typeof RoleSchema>;