import { z } from "zod";

export const addUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().min(1, "O email é obrigatório").email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  role: z.string().min(1, "O cargo é obrigatório"),

  // Aluno fields
  matricula: z.number().optional(),
  id_curso: z.number().optional(),

  // Professor fields
  curso_ids: z.array(z.number()).optional(),

  // Coordenador fields
  id_curso_responsavel: z.number().optional(),
});

export type AddUserParams = z.infer<typeof addUserSchema>;

export const removeUserSchema = z.object({
  userId: z.string(),
});

export const banUserSchema = z.object({
  userId: z.string(),
  reason: z.string().optional(),
  expiresAt: z.date().optional(),
});

export const unbanUserSchema = z.object({
  userId: z.string(),
});

// New schema for changing user roles
export const changeRoleSchema = z.object({
  userId: z.string().min(1, "ID do usuário é obrigatório"),
  role: z.string().min(1, "Novo cargo é obrigatório"),
});

export type ChangeRoleParams = z.infer<typeof changeRoleSchema>;

export const cursoSchema = z.object({
  nome: z.string().min(1, "O nome do curso é obrigatório"),
  horasComplementaresObrigatorias: z
    .number()
    .min(1, "A carga horária obrigatória é obrigatória e deve ser positiva"),
});

export type CursoFormData = z.infer<typeof cursoSchema>;
