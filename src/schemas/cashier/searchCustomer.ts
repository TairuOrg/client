import z from "zod";

const REGEX = {
  id: new RegExp(/^[^a-zA-Z*/+.\?\\'[\]{}><!~|¡=¿@#$%^&()_`:;"-]+$/),
};

export const searchCustomerSchema = z.object({
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
});

export type SearchCustomer = z.infer<typeof searchCustomerSchema>;
