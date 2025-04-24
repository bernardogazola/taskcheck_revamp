"use server";

import { auth } from "@/lib/auth";
import { ForbiddenError } from "@/lib/http-errors";
import {
  addUserSchema,
  banUserSchema,
  removeUserSchema,
  unbanUserSchema,
  AddUserParams,
  cursoSchema,
  CursoFormData,
  changeRoleSchema,
} from "@/lib/validators/adminSchema";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { headers } from "next/headers";
import prisma from "@/lib/database/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { Curso } from "@prisma/client";
export async function addUser(user: AddUserParams): Promise<ActionResponse> {
  const validationResult = await action({
    params: user,
    schema: addUserSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  const permissionResult = await auth.api.userHasPermission({
    body: {
      userId: session?.user.id,
      role: "admin",
      permission: {
        user: ["create"],
      },
    },
  });

  if (!permissionResult.success) {
    return handleError(
      new ForbiddenError("Você não tem permissão para adicionar usuários")
    ) as ErrorResponse;
  }

  try {
    const result = await auth.api.createUser({
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role || "aluno",
      },
      headers: await headers(),
    });

    // Create corresponding role record in the database
    const userRole = user.role || "aluno";
    const userId = result.user.id;

    // Create role-specific record based on the user's role
    switch (userRole) {
      case "aluno":
        if (!user.matricula || !user.id_curso) {
          throw new Error(
            "Número de matrícula e curso são obrigatórios para alunos"
          );
        }
        await prisma.aluno.create({
          data: {
            id_usuario: userId,
            matricula: user.matricula,
            id_curso: user.id_curso,
          },
        });
        break;

      case "professor":
        await prisma.professor.create({
          data: {
            id_usuario: userId,
          },
        });

        // If curso_ids is provided, create professor-curso relationships
        if (user.curso_ids && user.curso_ids.length > 0) {
          await Promise.all(
            user.curso_ids.map((cursoId) =>
              prisma.professorCurso.create({
                data: {
                  id_professor: userId,
                  id_curso: cursoId,
                },
              })
            )
          );
        }
        break;

      case "coordenador":
        if (!user.id_curso_responsavel) {
          throw new Error("Curso responsável é obrigatório para coordenadores");
        }
        await prisma.coordenador.create({
          data: {
            id_usuario: userId,
            id_curso_responsavel: user.id_curso_responsavel,
          },
        });
        break;
    }

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function removeUser(userId: string): Promise<ActionResponse> {
  const validationResult = await action({
    params: { userId },
    schema: removeUserSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  const permissionResult = await auth.api.userHasPermission({
    body: {
      userId: session?.user.id,
      role: "admin",
      permission: {
        user: ["delete"],
      },
    },
  });

  if (!permissionResult.success) {
    return handleError(
      new ForbiddenError("Você não tem permissão para remover usuários")
    ) as ErrorResponse;
  }

  try {
    const result = await auth.api.removeUser({
      body: { userId },
      headers: await headers(),
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function banUser(
  userId: string,
  reason?: string,
  expiresAt?: Date
): Promise<ActionResponse> {
  const validationResult = await action({
    params: { userId, reason, expiresAt },
    schema: banUserSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  const permissionResult = await auth.api.userHasPermission({
    body: {
      userId: session?.user.id,
      role: "admin",
      permission: {
        user: ["ban"],
      },
    },
  });

  if (!permissionResult.success) {
    return handleError(
      new ForbiddenError("Você não tem permissão para banir usuários")
    ) as ErrorResponse;
  }

  try {
    const result = await auth.api.banUser({
      body: {
        userId,
        banReason: reason,
        banExpiresIn: expiresAt
          ? Math.floor((expiresAt.getTime() - new Date().getTime()) / 1000)
          : undefined,
      },
      headers: await headers(),
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function unbanUser(userId: string): Promise<ActionResponse> {
  const validationResult = await action({
    params: { userId },
    schema: unbanUserSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  const permissionResult = await auth.api.userHasPermission({
    body: {
      userId: session?.user.id,
      role: "admin",
      permission: {
        user: ["ban"],
      },
    },
  });

  if (!permissionResult.success) {
    return handleError(
      new ForbiddenError("Você não tem permissão para desbanir usuários")
    ) as ErrorResponse;
  }

  try {
    const result = await auth.api.unbanUser({
      body: { userId },
      headers: await headers(),
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

interface CursosResponse {
  cursos: Curso[];
  total?: number;
}

export async function getAllCursos({
  pagination,
  sorting,
  filters,
}: {
  pagination: { pageIndex: number; pageSize: number };
  sorting: { id: string; desc: boolean }[];
  filters: { id: string; value: string }[];
}): Promise<ActionResponse<CursosResponse>> {
  const validationResult = await action({
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  try {
    if (!session?.user || session.user.role !== "admin") {
      throw new ForbiddenError("Você não tem permissão para listar cursos");
    }

    const sortColumn = sorting.length > 0 ? sorting[0].id : "id";
    const sortDirection =
      sorting.length > 0 && sorting[0].desc ? "desc" : "asc";

    // Get filter parameters
    const nameFilter = filters.find((f) => f.id === "nome")?.value;

    // Define where clause based on filters
    const where: Prisma.CursoWhereInput = nameFilter
      ? {
          nome: {
            contains: nameFilter,
            mode: Prisma.QueryMode.insensitive, // Case-insensitive search
          },
        }
      : {};

    // Fetch data with pagination, sorting, and filtering
    const [cursos, total] = await Promise.all([
      prisma.curso.findMany({
        where,
        orderBy: {
          [sortColumn]: sortDirection,
        },
        skip: pagination.pageIndex * pagination.pageSize,
        take: pagination.pageSize,
      }),
      prisma.curso.count({ where }),
    ]);

    return {
      success: true,
      data: { cursos, total },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function createCurso(
  data: CursoFormData
): Promise<ActionResponse> {
  const validationResult = await action({
    params: data,
    schema: cursoSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  const permissionResult = await auth.api.userHasPermission({
    body: {
      userId: session?.user.id,
      role: "admin",
      permission: {
        user: ["create"], // Assuming admin permissions
      },
    },
  });

  if (!permissionResult.success) {
    return handleError(
      new ForbiddenError("Você não tem permissão para criar cursos")
    ) as ErrorResponse;
  }

  try {
    await prisma.curso.create({
      data: {
        nome: data.nome,
        horasComplementaresObrigatorias: data.horasComplementaresObrigatorias,
      },
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function updateCurso(
  id: number,
  data: CursoFormData
): Promise<ActionResponse> {
  const validationResult = await action({
    params: { id, ...data },
    schema: z.object({
      id: z.number(),
      ...cursoSchema.shape,
    }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  const permissionResult = await auth.api.userHasPermission({
    body: {
      userId: session?.user.id,
      role: "admin",
      permission: {
        user: ["create"], // Assuming admin permissions
      },
    },
  });

  if (!permissionResult.success) {
    return handleError(
      new ForbiddenError("Você não tem permissão para atualizar cursos")
    ) as ErrorResponse;
  }

  try {
    await prisma.curso.update({
      where: { id },
      data: {
        nome: data.nome,
        horasComplementaresObrigatorias: data.horasComplementaresObrigatorias,
      },
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function deleteCurso(id: number): Promise<ActionResponse> {
  const validationResult = await action({
    params: { id },
    schema: z.object({ id: z.number() }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  const permissionResult = await auth.api.userHasPermission({
    body: {
      userId: session?.user.id,
      role: "admin",
      permission: {
        user: ["delete"], // Assuming admin permissions
      },
    },
  });

  if (!permissionResult.success) {
    return handleError(
      new ForbiddenError("Você não tem permissão para excluir cursos")
    ) as ErrorResponse;
  }

  try {
    // Check if there are related records
    const hasRelatedAlunos = await prisma.aluno.findFirst({
      where: { id_curso: id },
    });

    if (hasRelatedAlunos) {
      return {
        success: false,
        error: {
          message:
            "Não é possível excluir este curso porque existem alunos vinculados a ele.",
        },
      };
    }

    await prisma.curso.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function changeUserRole(
  userId: string,
  role: string
): Promise<ActionResponse> {
  const validationResult = await action({
    params: { userId, role },
    schema: changeRoleSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  const permissionResult = await auth.api.userHasPermission({
    body: {
      userId: session?.user.id,
      role: "admin",
      permission: {
        user: ["set-role"],
      },
    },
  });

  if (!permissionResult.success) {
    return handleError(
      new ForbiddenError(
        "Você não tem permissão para alterar cargos de usuários"
      )
    ) as ErrorResponse;
  }

  try {
    const updatedUser = await auth.api.setRole({
      body: {
        userId,
        role,
      },
      headers: await headers(),
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
