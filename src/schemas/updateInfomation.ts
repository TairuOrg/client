import { z } from 'zod';
const REGEX ={
    name: new RegExp(/^[^0-9*/+.\?\\[\]{}><!~|¡=¿@#$%^&()_`:;"]+$/),
    phone: new RegExp(/^[^a-zA-Z*/+.\?\\'[\]{}><!~|¡=¿@#$%^&()_`:;"-]+$/)
}
export const updateInformation = z.object({
    fullname: z.string().min(1, "El nombre no puede estar vacío").regex(
        REGEX.name,"Caracteres inválidos"
    )
    .max(70, "El nombre no puede tener más de 70 caracteres"),
    state: z.string().min(1, "Debe seleccionar un estado"),
    phoneCode: z.string().length(3, "Código de de línea inválido"),
    phoneNumber: z
    .string()
    .length(7, "Número de teléfono inválido")
    .regex(REGEX.phone, "Caracteres inválidos"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").optional(),
    confirmPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").optional(),
    personal_id: z.any(),
    email: z.string().email("Correo electrónico inválido"),


}).refine(data => {
    return data.password === data.confirmPassword
}, {
    message: "Las contraseñas no coinciden",
});

export type UpdateInformation = z.infer<typeof updateInformation>;