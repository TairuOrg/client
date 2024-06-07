import {z} from 'zod'

export const personalInformationSchema = z.object({
  fullname: z.string().min(1, "El nombre no puede estar vacío"),
  idType: z.string().length(1, "Tipo de cédula inválido"),
  identification: z
    .string()
    .min(6, "La cédula no puede ser menor a 6 caracteres")
    .max(8, "La cédula no puede ser mayor a 8 caracteres"),
  state: z.string().min(1, "Debe seleccionar un estado"),
  phoneCode: z.string().length(3, "Código de de línea inválido"),
  phoneNumber: z.string().length(7, "Número de teléfono inválido"),
});

export type PersonalInformationSchema = z.infer<typeof personalInformationSchema>