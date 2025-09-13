import { z } from 'zod';

// prettier-ignore
export const CompanyInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    users: z.array(z.unknown()),
    products: z.array(z.unknown())
}).strict();

export type CompanyInputType = z.infer<typeof CompanyInputSchema>;
