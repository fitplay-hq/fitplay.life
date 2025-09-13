import { z } from 'zod';

export const VerificationTokenScalarFieldEnumSchema = z.enum(['id', 'identifier', 'token', 'expires', 'createdAt'])

export type VerificationTokenScalarFieldEnum = z.infer<typeof VerificationTokenScalarFieldEnumSchema>;