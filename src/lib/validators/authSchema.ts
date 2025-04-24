import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" })
    .refine(
      (email) => email.endsWith("@pucpr.edu.br") || email.endsWith("@pucpr.br"),
      { message: "Email deve ser do domínio @pucpr.edu.br ou @pucpr.br" }
    ),
  password: z
    .string()
    .min(1, { message: "Senha é obrigatória" })
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Nome é obrigatório" })
      .max(100, { message: "Nome muito longo (máx. 100 caracteres)" })
      .refine((name) => /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(name), {
        message: "Nome deve conter apenas letras e espaços",
      }),
    email: z
      .string()
      .min(1, { message: "Email é obrigatório" })
      .email({ message: "Email inválido" })
      .refine(
        (email) =>
          email.endsWith("@pucpr.edu.br") || email.endsWith("@pucpr.br"),
        { message: "Email deve ser do domínio @pucpr.edu.br ou @pucpr.br" }
      ),
    password: z
      .string()
      .min(6, { message: "Senha deve ter pelo menos 6 caracteres" })
      .max(100, { message: "Senha muito longa (máx. 100 caracteres)" })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Senha deve conter pelo menos uma letra maiúscula",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Senha deve conter pelo menos um número",
      })
      .refine((password) => /[^A-Za-z0-9]/.test(password), {
        message: "Senha deve conter pelo menos um caractere especial",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirmação de senha é obrigatória" }),
    curso: z.string().min(1, { message: "Curso é obrigatório" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
