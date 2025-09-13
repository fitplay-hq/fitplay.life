import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'name', 'email', 'password', 'phone', 'role', 'gender', 'birthDate', 'companyId', 'createdAt', 'updatedAt', 'verified'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;