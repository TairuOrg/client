import { z } from 'zod';

export const accountSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  confirmPassword: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'], // path to set the error on
});

export type AccountSchema = z.infer<typeof accountSchema>;