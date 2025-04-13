"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import handleError from "@/lib/handlers/error";
import action from "@/lib/handlers/action";
import { signInSchema, signUpSchema } from "@/lib/validators/authSchema";
import { Role } from "@prisma/client";
import ROUTES from "@/constants/routes";

export async function signUp(params: AuthCredentials): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: signUpSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, email, password } = validationResult.params!;

  try {
    const result = await auth.api.signUpEmail({
      body: { name, email, password, role: Role.ALUNO },
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function signIn(
  params: Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: signInSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { email, password } = validationResult.params!;

  try {
    const result = await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
      callbackURL: ROUTES.DASHBOARD,
    });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
