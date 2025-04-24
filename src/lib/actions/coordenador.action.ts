"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
} from "@/lib/http-errors";
import prisma from "@/lib/database/prisma";
import handleError from "@/lib/handlers/error";
import { z } from "zod";
import action from "@/lib/handlers/action";
import { Categoria } from "@prisma/client";
import { Prisma } from "@prisma/client";
import {
  categoriaSchema,
  CategoriaFormData,
} from "@/lib/validators/coordenadorSchema";

interface CategoriasResponse {
  categorias: Categoria[];
  total?: number;
}

export async function getCategorias({
  pagination,
  sorting,
  filters,
}: {
  pagination: { pageIndex: number; pageSize: number };
  sorting: { id: string; desc: boolean }[];
  filters: { id: string; value: string }[];
}): Promise<ActionResponse<CategoriasResponse>> {
  const validationResult = await action({
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  try {
    if (session?.user.role !== "coordenador") {
      throw new ForbiddenError(
        "Apenas coordenadores podem acessar as categorias"
      );
    }

    const userId = session?.user.id;

    const coordenador = await prisma.coordenador.findUnique({
      where: {
        id_usuario: userId,
      },
    });

    if (!coordenador) {
      throw new NotFoundError("Coordenador não encontrado");
    }

    const sortColumn = sorting.length > 0 ? sorting[0].id : "id";
    const sortDirection =
      sorting.length > 0 && sorting[0].desc ? "desc" : "asc";

    // Get filter parameters
    const nameFilter = filters.find((f) => f.id === "nome")?.value;

    // Define where clause based on filters
    const where: Prisma.CategoriaWhereInput = {
      id_curso: coordenador?.id_curso_responsavel,
      ...(nameFilter
        ? {
            nome: {
              contains: nameFilter,
              mode: Prisma.QueryMode.insensitive, // Case-insensitive search
            },
          }
        : {}),
    };

    // Fetch data with pagination, sorting, and filtering
    const [categorias, total] = await Promise.all([
      prisma.categoria.findMany({
        where,
        orderBy: {
          [sortColumn]: sortDirection,
        },
        skip: pagination.pageIndex * pagination.pageSize,
        take: pagination.pageSize,
      }),
      prisma.categoria.count({ where }),
    ]);

    return {
      success: true,
      data: { categorias, total },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getCategoria(
  id: number
): Promise<ActionResponse<Categoria>> {
  const validationResult = await action({
    params: { id },
    schema: z.object({ id: z.number() }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const categoria = await prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundError("Categoria não encontrada");
    }

    return {
      success: true,
      data: categoria,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function removeCategoria(id: number): Promise<ActionResponse> {
  const validationResult = await action({
    params: { id },
    schema: z.object({ id: z.number() }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  try {
    if (session?.user.role !== "coordenador") {
      throw new ForbiddenError("Apenas coordenadores podem remover categorias");
    }

    const userId = session?.user.id;

    const coordenador = await prisma.coordenador.findUnique({
      where: {
        id_usuario: userId,
      },
    });

    if (!coordenador) {
      throw new NotFoundError("Coordenador não encontrado");
    }

    // Check if the category exists and belongs to the coordinator's course
    const categoria = await prisma.categoria.findUnique({
      where: { id },
      include: { curso: true },
    });

    if (!categoria) {
      throw new NotFoundError("Categoria não encontrada");
    }

    if (categoria.id_curso !== coordenador.id_curso_responsavel) {
      throw new ForbiddenError(
        "Você não tem permissão para remover categorias de outros cursos"
      );
    }

    await prisma.relatorioAtividade.updateMany({
      where: {
        id_categoria: id,
      },
      data: {
        id_categoria: undefined,
        status: "RECATEGORIZACAO",
      },
    });

    // Remove the category
    await prisma.categoria.delete({
      where: { id },
    });

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function addCategoria(
  data: CategoriaFormData
): Promise<ActionResponse> {
  const validationResult = await action({
    params: data,
    schema: categoriaSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  try {
    if (session?.user.role !== "coordenador") {
      throw new ForbiddenError("Apenas coordenadores podem criar categorias");
    }

    const userId = session?.user.id;

    const coordenador = await prisma.coordenador.findUnique({
      where: {
        id_usuario: userId,
      },
    });

    if (!coordenador) {
      throw new NotFoundError("Coordenador não encontrado");
    }

    const curso = await prisma.curso.findUnique({
      where: {
        id: coordenador.id_curso_responsavel,
      },
    });

    if (!curso) {
      throw new NotFoundError("Curso não encontrado");
    }

    const categoria = await prisma.categoria.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        carga_horaria: data.carga_horaria,
        id_curso: curso.id,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function editCategoria(
  id: number,
  data: CategoriaFormData
): Promise<ActionResponse> {
  const validationResult = await action({
    params: { id, ...data },
    schema: z.object({
      id: z.number(),
      ...categoriaSchema.shape,
    }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  try {
    if (session?.user.role !== "coordenador") {
      throw new ForbiddenError("Apenas coordenadores podem editar categorias");
    }

    const userId = session?.user.id;

    const coordenador = await prisma.coordenador.findUnique({
      where: {
        id_usuario: userId,
      },
    });

    if (!coordenador) {
      throw new NotFoundError("Coordenador não encontrado");
    }

    // Check if the category exists and belongs to the coordinator's course
    const categoria = await prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundError("Categoria não encontrada");
    }

    if (categoria.id_curso !== coordenador.id_curso_responsavel) {
      throw new ForbiddenError(
        "Você não tem permissão para editar categorias de outros cursos"
      );
    }

    // Update the category
    await prisma.categoria.update({
      where: { id },
      data: {
        nome: data.nome,
        descricao: data.descricao,
        carga_horaria: data.carga_horaria,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
