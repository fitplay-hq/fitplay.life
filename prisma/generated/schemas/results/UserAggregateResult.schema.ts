import { z } from 'zod';
export const UserAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    email: z.number(),
    password: z.number(),
    phone: z.number(),
    role: z.number(),
    gender: z.number(),
    birthDate: z.number(),
    company: z.number(),
    companyId: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    verified: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    password: z.string().nullable(),
    phone: z.string().nullable(),
    birthDate: z.date().nullable(),
    companyId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    password: z.string().nullable(),
    phone: z.string().nullable(),
    birthDate: z.date().nullable(),
    companyId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});