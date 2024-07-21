import z from "zod";

export const modifyItemSchema = (maxStock: number) =>
  z.object({
    name: z
      .string()
      .min(1, "El nombre del artículo no puede estar vacío")
      .max(70, "El nombre del artículo no puede tener más de 50 caracteres"),
    price: z
      .string()
      .min(1, "El precio del artículo no puede estar vacío")
      .regex(
        /^(?!-)\d{1,4}(\.\d{1,2})?$/,
        "El precio no cumple con el formato deseado de hasta 4 dígitos enteros y 2 decimales y no puede ser negativo"
      ),

    barcode_id: z
      .string()
      .min(4, "El código de barras debe tener al menos 4 dígitos")
      .max(14, "El código de barras debe tener como máximo 14 dígitos")
      .regex(
        /^\d{4,14}$/,
        "El código de barras debe tener entre 4 y 14 dígitos"
      ),
    quantity: z
      .string()
      .refine((value) => value.trim() === "" || parseInt(value) >= 1, {
        message: "El stock del artículo debe ser mayor a 0",
      })
      .refine((value) => value.trim() === "" || parseInt(value) <= maxStock, {
        message: `El stock no puede ser mayor al stock máximo (${maxStock})`,
      }),

    manufacturer: z
      .string()
      .min(1, "El fabricante del artículo no puede estar vacío")
      .max(
        70,
        "El fabricante del artículo no puede tener más de 50 caracteres"
      ),
  });

export type ModifyItemSchema = z.infer<ReturnType<typeof modifyItemSchema>>;
