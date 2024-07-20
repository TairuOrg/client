import z from "zod";
const REGEX = {
  id: new RegExp(/^[^a-zA-Z*/+.\?\\'[\]{}><!~|¡=¿@#$%^&()_`:;",\- ]+$/),

  phone: new RegExp(/^[^a-zA-Z*/+.\?\\'[\]{}><!~|¡=¿@#$%^&()_`:;"-]+$/),
  name: new RegExp(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' ]+$/) ,
};

export const cashierSchema = z.object({
    name: z
    .string()
    .min(1, "El nombre del cajero no puede estar vacío")
    .max(70, "El nombre del cajero no puede contener más de 70 caracteres")
    .regex(REGEX.name,"Caracteres Inválidos"),

    id_type: z
    .string()
    .refine((val: string) => ["V", "E"].includes(val.toUpperCase()), {
      message: "Tipo de cédula inválido",
    }),

    personal_id: z
    .string()
    .min(7, "La cédula no puede ser menor a 7 caracteres")
    .max(9, "La cédula no puede ser mayor a 9 caracteres")
    .regex(REGEX.id, "Caracteres inválidos"),

    phone_code: z
    .string()
    .refine(
      (val: string) =>
        ["416", "426", "414", "424", "412"].includes(val.toUpperCase()),
      {
        message: "Tipo de código celular inválido",
      }
    ),
    phone_number: z
    .string()
    .length(7, "Número de teléfono inválido")
    .regex(REGEX.phone, "Caracteres inválidos"),
  
    email: z
    .string()
    .email('Correo electrónico inválido')
    .min(5,"El correo electrónico debe tener al menos 5 caracteres")
    .max(50, "El correo electrónico no puede tener más de 50 caracteres"),

    password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),

    confirmPassword: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    
    state: z
    .string()
    .min(1, "Debe seleccionar un estado"),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'], // path to set the error on
});
export type CashierSchema = z.infer<typeof cashierSchema>;
