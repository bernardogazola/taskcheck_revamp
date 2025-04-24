import { z } from "zod";

export const categoriaSchema = z.object({
  nome: z.string().min(1, "O nome da categoria é obrigatório"),
  descricao: z.string().min(1, "A descrição da categoria é obrigatória"),
  carga_horaria: z
    .number()
    .min(1, "A carga horária da categoria é obrigatória"),
});

export type CategoriaFormData = z.infer<typeof categoriaSchema>;
