"use server";

import { ZodError, ZodSchema } from "zod";
import { UnauthorizedError, ValidationError } from "@/lib/http-errors";
import { auth, Session } from "@/lib/auth";
import { headers } from "next/headers";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

async function action<T>({
  params,
  schema,
  authorize = false,
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
      return new UnauthorizedError();
    }
  }

  return { params, session };
}

export default action;
