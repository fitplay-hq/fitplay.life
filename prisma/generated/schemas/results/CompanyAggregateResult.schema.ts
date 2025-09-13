import { z } from 'zod';
export const CompanyAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    address: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    users: z.number(),
    products: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    address: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    address: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});