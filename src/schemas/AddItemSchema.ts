import z from "zod";

export const addItemSchema = z.object({
  description: z
    .string()
    .min(1, "La descripción del artículo no puede estar vacía")
    .max(70, "La descripción del artículo no puede tener más de 70 caracteres"),

  barcode_id: z
    .string()
    .min(4, "El código de barras debe tener al menos 4 dígitos")
    .max(14, "El código de barras debe tener como máximo 14 dígitos")
    .regex(/^\d{4,14}$/, "El código de barras debe tener entre 4 y 14 dígitos"),
  manufacturer: z
    .string()
    .min(1, "El fabricante del artículo no puede estar vacío")
    .max(70, "El fabricante del artículo no puede tener más de 50 caracteres"),

  category: z.string().min(1, "La categoría del artículo no puede estar vacía"),

  name: z
    .string()
    .min(1, "El nombre del artículo no puede estar vacío")
    .max(70, "El nombre del artículo no puede tener más de 50 caracteres"),

  price: z
    .string()
    .min(1, "El precio del artículo no puede estar vacío")
    .regex(
      /^\d{1,4}(\.\d{1,2})?$/,
      "El precio no cumple con el formato deseado de hasta 4 dígitos enteros y 2 decimales"
    ),

  add_quantity: z
    .string()
    .min(1,"La cantidad no puede estar vacía")
    .regex(/^[1-9]\d*$/, "La cantidad no puede ser negativa ni decimal"), // entero y positivo
});

export type AddItemSchemaType = z.infer<typeof addItemSchema>;
