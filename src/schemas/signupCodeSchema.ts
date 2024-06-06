import { z } from 'zod';

export const signupCodeSchema = z.object({
  code: z.string().min(6, 'Code must be at least 6 characters long'),
});

export type SignupCodeSchema = z.infer<typeof signupCodeSchema>;
