import z from "zod";

export const modifyItemSchema = z.object({
  name: z.string().min(1, "El nombre del artículo no puede estar vacío"),
  price: z
    .string()
    .min(4, "El precio del artículo no puede ser menor a 1"),
  barcode: z
    .string()
    .min(1, "El código de barras del artículo no puede estar vacío"),
  stock: z.string().min(1, "El stock del artículo no puede ser menor a 1"),
  manufacturer: z
    .string()
    .min(1, "El fabricante del artículo no puede estar vacío"),
});

export type ModifyItemSchema = z.infer<typeof modifyItemSchema>;
