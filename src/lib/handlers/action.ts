"use server";

import { ZodError, ZodSchema } from "zod";
import { UnauthorizedError, ValidationError } from "@/lib/http-errors";
import { auth, Session } from "@/lib/auth";
import { headers } from "next/headers";

type Role = "aluno" | "professor" | "coordenador" | "admin";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
  requiredRole?: Role | Role[];
};

async function action<T>({
  params,
  schema,
  authorize = false,
  requiredRole,
}: ActionOptions<T>) {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error("Validação do schema falhou");
      }
    }
  }

  let session: Session | null = null;

  if (authorize) {
    session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return new UnauthorizedError("Não autorizado");
    }

    if (requiredRole) {
      if (Array.isArray(requiredRole)) {
        if (!requiredRole.includes(session.user.role as Role)) {
          return new UnauthorizedError("Não autorizado");
        }
      } else {
        if (session.user.role !== requiredRole) {
          return new UnauthorizedError("Não autorizado");
        }
      }
    }
  }

  return { params, session };
}

export default action;
