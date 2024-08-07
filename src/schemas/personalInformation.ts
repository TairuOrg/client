import {z} from 'zod'

const REGEX = {
  
  name: new RegExp(/^[^0-9*/+.\?\\[\]{}><!~|¡=¿@#$%^&()_`:;"]+$/),
  id: new RegExp(/^[^a-zA-Z*/+.\?\\'[\]{}><!~|¡=¿@#$%^&()_`:;",\- ]+$/),
  phone: new RegExp(/^[^a-zA-Z*/+.\?\\'[\]{}><!~|¡=¿@#$%^&()_`:;"-]+$/),
};
export const personalInformationSchema = z.object({
  fullname: z.string().min(1, "El nombre no puede estar vacío").regex(
    REGEX.name, // lol
    "Caracteres inválidos"
  )
  .max(70, "El nombre no puede tener más de 70 caracteres"),
  idType: z.string().length(1, "Tipo de cédula inválido"),
  identification: z
    .string()
    .min(7, "La cédula no puede ser menor a 7 caracteres")
    .max(9, "La cédula no puede ser mayor a 9 caracteres")
    .regex(REGEX.id, "Caracteres inválidos"),
  state: z.string().min(1, "Debe seleccionar un estado"),
  phoneCode: z.string().length(3, "Código de de línea inválido"),
  phoneNumber: z
    .string()
    .length(7, "Número de teléfono inválido")
    .regex(REGEX.phone, "Caracteres inválidos"),
});

export type PersonalInformationSchema = z.infer<typeof personalInformationSchema>