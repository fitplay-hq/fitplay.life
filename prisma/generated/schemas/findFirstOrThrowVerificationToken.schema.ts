import { Prisma } from '../../../lib/generated/prisma';
import { z } from 'zod';
import { VerificationTokenOrderByWithRelationInputObjectSchema } from './objects/VerificationTokenOrderByWithRelationInput.schema';
import { VerificationTokenWhereInputObjectSchema } from './objects/VerificationTokenWhereInput.schema';
import { VerificationTokenWhereUniqueInputObjectSchema } from './objects/VerificationTokenWhereUniqueInput.schema';
import { VerificationTokenScalarFieldEnumSchema } from './enums/VerificationTokenScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const VerificationTokenFindFirstOrThrowSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
    id: z.boolean().optional(),
    identifier: z.boolean().optional(),
    token: z.boolean().optional(),
    expires: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.VerificationTokenSelect>;

export const VerificationTokenFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    identifier: z.boolean().optional(),
    token: z.boolean().optional(),
    expires: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const VerificationTokenFindFirstOrThrowSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({ select: VerificationTokenFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([VerificationTokenOrderByWithRelationInputObjectSchema, VerificationTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: VerificationTokenWhereInputObjectSchema.optional(), cursor: VerificationTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs>;

export const VerificationTokenFindFirstOrThrowZodSchema = z.object({ select: VerificationTokenFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([VerificationTokenOrderByWithRelationInputObjectSchema, VerificationTokenOrderByWithRelationInputObjectSchema.array()]).optional(), where: VerificationTokenWhereInputObjectSchema.optional(), cursor: VerificationTokenWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array()]).optional() }).strict();