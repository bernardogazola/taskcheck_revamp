import { z } from "zod";
import { StatusRelatorio } from "@prisma/client";

export const relatorioSchema = z.object({
  nome: z
    .string()
    .min(1, { message: "O nome da atividade é obrigatório" })
    .max(100, { message: "Nome muito longo (máx. 100 caracteres)" }),
  texto_reflexao: z
    .string()
    .min(10, { message: "A reflexão deve ter pelo menos 10 caracteres" }),
  data_realizacao: z.string().refine((data) => !isNaN(Date.parse(data)), {
    message: "Data inválida",
  }),
  id_categoria: z.number().int().positive({ message: "Categoria inválida" }),
  certificado: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 5MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "O arquivo deve estar no formato PDF",
    }),
});

export const feedbackSchema = z.object({
  texto_feedback: z
    .string()
    .min(5, { message: "O feedback deve ter pelo menos 5 caracteres" }),
  status: z.nativeEnum(StatusRelatorio),
});

export const validacaoSchema = z.object({
  status: z.nativeEnum(StatusRelatorio),
  texto_feedback: z.string().optional(),
  horas_validadas: z
    .number()
    .int()
    .min(0, { message: "As horas validadas não podem ser negativas" })
    .optional(),
});
