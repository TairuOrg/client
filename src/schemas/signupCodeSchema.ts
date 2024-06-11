import { z } from 'zod';

export const signupCodeSchema = z.object({
  code: z.string().min(6, 'El código necesita tener al menos 6 dígitos.'),
});

export type SignupCodeSchema = z.infer<typeof signupCodeSchema>;
