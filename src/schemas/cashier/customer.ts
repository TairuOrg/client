import z from "zod";

const REGEX = {
  id: new RegExp(/^[^a-zA-Z*/+.\?\\'[\]{}><!~|¡=¿@#$%^&()_`:;"-]+$/),
  phone: new RegExp(/^[^a-zA-Z*/+.\?\\'[\]{}><!~|¡=¿@#$%^&()_`:;"-]+$/),
  name: new RegExp(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' ]+$/),
};

export const createCustomerSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre del cliente no puede estar vacío")
    .max(70, "El nombre del cliente no puede contener más de 70 caracteres"),
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

  residence_location: z.string().min(1, "Debe seleccionar un estado"),
});


export type CreateCustomer = z.infer<typeof createCustomerSchema>;
