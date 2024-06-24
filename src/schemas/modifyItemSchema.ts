import z from "zod";

// Helper function to convert and validate number inputs
const preprocessNumber = (val: any) => {
  const number = parseFloat(val as string);
  if (isNaN(number)) {
    return val; // Let zod handle invalid numbers
  }
  return number;
};

export const modifyItemSchema = z.object({
  name: z.string()
    .min(1, "El nombre del artículo no puede estar vacío")
    .max(50, "El nombre del artículo no puede tener más de 50 caracteres"),
  price: z.preprocess(
    preprocessNumber,
    z.number()
      .positive("El precio debe ser mayor a 0 y debe ser un número válido")
      .max(9999.99, "El precio no puede ser mayor a 9999.99")
  ),
  barcode: z.preprocess(
    (val) => {
      const number = parseInt(val as string);
      if (isNaN(number)) {
        return val; // Let zod handle invalid numbers
      }
      return number;
    },
    z.number()
      .min(100000000000, "El código de barras debe tener al menos 12 caracteres (números)")
      .max(99999999999999, "El código de barras no puede tener más de 14 caracteres (números)")
  ),
  stock: z.preprocess(
    (val) => {
      const number = parseInt(val as string);
      if (isNaN(number)) {
        return val; // Let zod handle invalid numbers
      }
      return number;
    },
    z.number()
      .int("El stock debe ser un número entero válido")
      .min(1, "El stock del artículo no puede ser menor a 1")
  ),
  manufacturer: z.string()
    .min(1, "El fabricante del artículo no puede estar vacío")
    .max(50, "El fabricante del artículo no puede tener más de 50 caracteres"),
});

export type ModifyItemSchema = z.infer<typeof modifyItemSchema>;
