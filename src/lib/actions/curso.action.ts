"use server";

import { Curso } from "@prisma/client";
import handleError from "../handlers/error";
import prisma from "@/lib/database/prisma";

export async function getAllCursos(): Promise<ActionResponse<Curso[]>> {
  try {
    const cursos = await prisma.curso.findMany();
    return { success: true, data: cursos };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
