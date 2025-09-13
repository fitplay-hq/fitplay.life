import { z } from 'zod';

// prettier-ignore
export const VerificationTokenResultSchema = z.object({
    id: z.string(),
    identifier: z.string(),
    token: z.string(),
    expires: z.date(),
    createdAt: z.date()
}).strict();

export type VerificationTokenResultType = z.infer<typeof VerificationTokenResultSchema>;
