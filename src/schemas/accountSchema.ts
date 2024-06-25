import { z } from 'zod';

export const accountSchema = z.object({
  email: z.string().email('Correo electrónico inválido').min(5,"El correo electrónico debe tener al menos 5 caracteres").max(50, "El correo electrónico no puede tener más de 50 caracteres"),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  confirmPassword: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'], // path to set the error on
});

export type AccountSchema = z.infer<typeof accountSchema>;