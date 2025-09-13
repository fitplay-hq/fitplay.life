import { z } from 'zod';

export const CategorySchema = z.enum(['Fitness_And_Gym_Equipment', 'Nutrition_And_Health', 'Diagnostics_And_Prevention', 'Ergonomics_And_Workspace_Comfort', 'Health_And_Wellness_Services'])

export type Category = z.infer<typeof CategorySchema>;