import { z } from 'zod';

// prettier-ignore
export const VerificationTokenInputSchema = z.object({
    id: z.string(),
    identifier: z.string(),
    token: z.string(),
    expires: z.date(),
    createdAt: z.date()
}).strict();

export type VerificationTokenInputType = z.infer<typeof VerificationTokenInputSchema>;
