import { z } from 'zod';

// prettier-ignore
export const VerificationTokenModelSchema = z.object({
    id: z.string(),
    identifier: z.string(),
    token: z.string(),
    expires: z.date(),
    createdAt: z.date()
}).strict();

export type VerificationTokenModelType = z.infer<typeof VerificationTokenModelSchema>;
