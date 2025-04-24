"use server";

import { auth } from "@/lib/auth";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/http-errors";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { headers } from "next/headers";
import prisma from "@/lib/database/prisma";
import { z } from "zod";
import {
  RelatorioFormData,
  relatorioSchema,
} from "@/lib/validators/reportSchema";
import {
  StatusRelatorio,
  RelatorioAtividade,
  Prisma,
  Categoria,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constants/routes";
import {
  uploadFile,
  downloadFile,
  deleteFile,
} from "@/lib/actions/file.action";

interface ActivitiesResponse {
  atividades: RelatorioAtividade[];
  total?: number;
}

export async function getAllActivities({
  pagination,
  sorting,
  filters,
}: {
  pagination: { pageIndex: number; pageSize: number };
  sorting: { id: string; desc: boolean }[];
  filters: { id: string; value: string }[];
}): Promise<ActionResponse<ActivitiesResponse>> {
  const validationResult = await action({
    authorize: true,
    requiredRole: "aluno",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  try {
    const userId = session?.user.id;

    const aluno = await prisma.aluno.findUnique({
      where: {
        id_usuario: userId,
      },
    });

    if (!aluno) {
      throw new NotFoundError("Aluno não encontrado");
    }

    // Apply sorting
    const sortColumn = sorting?.length ? sorting[0].id : "data_envio";
    const sortDirection = sorting?.length && sorting[0].desc ? "desc" : "asc";

    // Apply filters
    const statusFilter = filters?.find((f) => f.id === "status")?.value;
    const nameFilter = filters?.find((f) => f.id === "nome")?.value;

    // Define where clause based on filters
    const where: Prisma.RelatorioAtividadeWhereInput = {
      id_aluno: aluno?.id_usuario,
      ...(statusFilter
        ? {
            status: statusFilter as StatusRelatorio,
          }
        : {}),
      ...(nameFilter
        ? {
            nome: {
              contains: nameFilter,
              mode: Prisma.QueryMode.insensitive,
            },
          }
        : {}),
    };

    const [atividades, total] = await Promise.all([
      prisma.relatorioAtividade.findMany({
        where,
        orderBy: {
          [sortColumn]: sortDirection,
        },
        skip: pagination.pageIndex * pagination.pageSize,
        take: pagination.pageSize,
        include: {
          categoria: {
            select: {
              id: true,
              nome: true,
              carga_horaria: true,
            },
          },
          feedbacks: {
            select: {
              id: true,
              texto_feedback: true,
              data_envio: true,
              professor: {
                select: {
                  usuario: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              data_envio: "desc",
            },
            take: 1,
          },
        },
      }),
      prisma.relatorioAtividade.count({ where }),
    ]);

    return {
      success: true,
      data: { atividades, total },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getAllCategories(): Promise<ActionResponse<Categoria[]>> {
  const validationResult = await action({
    authorize: true,
    requiredRole: "aluno",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  const userId = session?.user.id;

  const aluno = await prisma.aluno.findUnique({
    where: {
      id_usuario: userId,
    },
  });

  if (!aluno) {
    throw new NotFoundError("Aluno não encontrado");
  }

  try {
    const categorias = await prisma.categoria.findMany({
      where: {
        id_curso: aluno.id_curso,
      },
    });

    return { success: true, data: categorias };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function addActivity(
  data: RelatorioFormData
): Promise<ActionResponse> {
  const validationResult = await action({
    params: data,
    schema: relatorioSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  try {
    if (session?.user.role !== "aluno") {
      throw new ForbiddenError(
        "Apenas alunos podem criar relatórios de atividades"
      );
    }

    const { nome, texto_reflexao, data_realizacao, certificado, id_categoria } =
      validationResult.params!;

    const userId = session?.user.id;

    const aluno = await prisma.aluno.findUnique({
      where: {
        id_usuario: userId,
      },
    });

    if (!aluno) {
      throw new NotFoundError("Aluno não encontrado");
    }

    const categoria = await prisma.categoria.findUnique({
      where: {
        id: parseInt(id_categoria),
      },
    });

    if (!categoria) {
      throw new NotFoundError("Categoria não encontrada");
    }

    const { success: certificado_success, data: certificado_data } =
      await uploadFile(certificado);

    if (!certificado_success) {
      throw new Error("Erro ao fazer upload do certificado");
    }

    const atividade = await prisma.relatorioAtividade.create({
      data: {
        nome,
        texto_reflexao,
        data_realizacao: new Date(data_realizacao),
        data_envio: new Date(),
        horas_validadas: 0,
        certificado: certificado_data.path,
        id_aluno: aluno.id_usuario,
        id_categoria: categoria.id,
      },
    });

    console.log(certificado_data);

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

type DownloadResponseData = {
  arrayBuffer: ArrayBuffer;
  filename: string;
  contentType: string;
};

export type DownloadActionResponse =
  | { success: true; data: DownloadResponseData }
  | ErrorResponse;

export async function downloadCertificado(
  filename: string
): Promise<DownloadActionResponse> {
  const validationResult = await action({
    params: { filename },
    schema: z.object({ filename: z.string() }),
    authorize: true,
    requiredRole: "aluno",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;
  const reportOwner = await prisma.relatorioAtividade.findFirst({
    where: { certificado: filename, id_aluno: session?.user.id },
    select: { id: true },
  });
  if (!reportOwner) {
    return handleError(
      new ForbiddenError("Permission denied to download this certificate.")
    ) as ErrorResponse;
  }

  try {
    const { success, data: blobData } = await downloadFile(filename);

    if (!success || !(blobData instanceof Blob)) {
      throw new NotFoundError(
        "Certificado não encontrado ou erro no download."
      );
    }

    const arrayBuffer = await blobData.arrayBuffer();

    return {
      success: true,
      data: {
        arrayBuffer: arrayBuffer,
        filename: filename,
        contentType: blobData.type || "application/pdf",
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function editActivity(
  reportId: number,
  data: RelatorioFormData
): Promise<ActionResponse> {
  const validationResult = await action({
    params: { reportId, ...data },
    schema: z.object({
      reportId: z.number().int().positive(),
      ...relatorioSchema.shape,
    }),
    authorize: true,
    requiredRole: "aluno",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;
  const validatedData = validationResult.params!;

  try {
    const existingReport = await prisma.relatorioAtividade.findUnique({
      where: { id: reportId },
    });

    if (!existingReport) {
      throw new NotFoundError("Relatório não encontrado");
    }

    if (existingReport.id_aluno !== session?.user.id) {
      throw new ForbiddenError(
        "Você não tem permissão para editar este relatório"
      );
    }

    if (existingReport.status !== StatusRelatorio.AGUARDANDO_VALIDACAO) {
      throw new ForbiddenError(
        "Apenas relatórios em status 'Aguardando Validação' podem ser editados"
      );
    }

    let certificatePath = existingReport.certificado;
    let oldCertificatePathToDelete: string | null = null;

    if (validatedData.certificado && validatedData.certificado.size > 0) {
      const uploadResult = await uploadFile(validatedData.certificado);
      if (!uploadResult.success) {
        throw new Error("Erro ao fazer upload do novo certificado");
      }
      oldCertificatePathToDelete = existingReport.certificado;
      certificatePath = uploadResult.data.path;
    }

    await prisma.relatorioAtividade.update({
      where: { id: reportId },
      data: {
        nome: validatedData.nome,
        texto_reflexao: validatedData.texto_reflexao,
        data_realizacao: new Date(validatedData.data_realizacao),
        id_categoria: parseInt(validatedData.id_categoria),
        certificado: certificatePath,
      },
    });

    if (oldCertificatePathToDelete) {
      const deleteResult = await deleteFile(oldCertificatePathToDelete);
      if (!deleteResult.success) {
        throw new Error("Erro ao deletar o certificado antigo");
      }
    }

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function deleteAtividade(id: number): Promise<ActionResponse> {
  const validationResult = await action({
    params: { id },
    schema: z.object({ id: z.number() }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  const hasPermission = await prisma.relatorioAtividade.findFirst({
    where: { id_aluno: session?.user.id, id: id },
  });

  if (!hasPermission) {
    throw new ForbiddenError(
      "Você não tem permissão para excluir essa atividade"
    );
  }

  try {
    await prisma.relatorioAtividade.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function deleteReportAction(
  reportId: number
): Promise<ActionResponse> {
  const validationResult = await action({
    params: { reportId },
    schema: z.object({ reportId: z.number().int().positive() }),
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = validationResult.session;

  if (session?.user.role !== "aluno") {
    return handleError(
      new ForbiddenError(
        "Apenas alunos podem excluir seus relatórios de atividades"
      )
    ) as ErrorResponse;
  }

  try {
    // Verify report exists and belongs to the logged-in student
    const report = await prisma.relatorioAtividade.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      return {
        success: false,
        error: {
          message: "Relatório não encontrado",
        },
      };
    }

    // Check if report belongs to the user
    if (report.id_aluno !== session.user.id) {
      return handleError(
        new ForbiddenError("Você não tem permissão para excluir este relatório")
      ) as ErrorResponse;
    }

    // Check if report status allows deletion
    if (report.status !== StatusRelatorio.AGUARDANDO_VALIDACAO) {
      return {
        success: false,
        error: {
          message:
            "Apenas relatórios em status de aguardando validação podem ser excluídos",
        },
      };
    }

    // Delete report
    await prisma.relatorioAtividade.delete({
      where: { id: reportId },
    });

    // Revalidate path to update UI
    revalidatePath(ROUTES.DASHBOARD_ALUNO.ATIVIDADES);

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
