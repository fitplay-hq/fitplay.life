import { z } from 'zod';
export const VariantAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    variantCategory: z.number(),
    variantValue: z.number(),
    mrp: z.number(),
    credits: z.number(),
    product: z.number(),
    productId: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    mrp: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    mrp: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    variantCategory: z.string().nullable(),
    variantValue: z.string().nullable(),
    mrp: z.number().int().nullable(),
    credits: z.string().nullable(),
    productId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    variantCategory: z.string().nullable(),
    variantValue: z.string().nullable(),
    mrp: z.number().int().nullable(),
    credits: z.string().nullable(),
    productId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});