import { z } from 'zod';

export const SubCategorySchema = z.enum(['Cardio_Equipment', 'Probiotics_And_Supplements', 'Wearable_Health_Technology', 'Standing_Desks_And_Accessories', 'Onsite_Fitness_Classes_And_Workshops'])

export type SubCategory = z.infer<typeof SubCategorySchema>;