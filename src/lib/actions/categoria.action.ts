"use server";

import action from "@/lib/handlers/action";
import prisma from "@/lib/database/prisma";
import handleError from "@/lib/handlers/error";
import { Categoria } from "@prisma/client";

export async function getCategoriesByAlunoId(
  alunoId: string
): Promise<ActionResponse<Categoria[]>> {
  const validationResult = await action({
    authorize: true,
    requiredRole: "aluno",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  try {
    const aluno = await prisma.aluno.findUnique({
      where: { id_usuario: session?.user.id },
    });

    if (!aluno) {
      return handleError(new Error("Aluno não encontrado")) as ErrorResponse;
    }

    const curso = await prisma.curso.findUnique({
      where: { id: aluno.id_curso },
    });

    if (!curso) {
      return handleError(new Error("Curso não encontrado")) as ErrorResponse;
    }

    const categorias = await prisma.categoria.findMany({
      where: { id_curso: curso.id },
    });

    return {
      success: true,
      data: categorias,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
