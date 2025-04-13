import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "@/lib/http-errors";
import { ZodError } from "zod";
import { APIError } from "better-auth/api";
import logger from "@/lib/logger";
import AUTH_ERROR_CODES from "@/constants/authErrorCodes";
export type ResponseType = "api" | "server";

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };
  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

const handleError = (error: unknown, responseType: ResponseType = "server") => {
  let errorType = "unknown";
  if (error instanceof RequestError) errorType = "request";
  else if (error instanceof ZodError) errorType = "validation";
  else if (error instanceof APIError) errorType = "api";
  else if (error instanceof Error) errorType = "general";

  switch (errorType) {
    case "request": {
      const requestError = error as RequestError;
      logger.error(
        { err: requestError },
        `${responseType.toUpperCase()} Erro: ${requestError.message}`
      );
      return formatResponse(
        responseType,
        requestError.statusCode,
        requestError.message,
        requestError.errors
      );
    }

    case "validation": {
      const zodError = error as ZodError;
      const validationError = new ValidationError(
        zodError.flatten().fieldErrors as Record<string, string[]>
      );

      logger.error(
        { err: zodError },
        `Erro de validação: ${validationError.message}`
      );

      return formatResponse(
        responseType,
        validationError.statusCode,
        validationError.message,
        validationError.errors
      );
    }

    case "api": {
      const apiError = error as APIError;
      const errorCodes = AUTH_ERROR_CODES;
      const getErrorMessage = (code: string, lang: "pt_BR") => {
        if (code in errorCodes) {
          return errorCodes[code as keyof typeof errorCodes][lang];
        }
        return "Erro inesperado";
      };

      logger.error(
        { err: apiError },
        `Erro de API: ${getErrorMessage(apiError.body?.code!, "pt_BR")}`
      );

      return formatResponse(
        responseType,
        apiError.statusCode,
        getErrorMessage(apiError.body?.code!, "pt_BR")
      );
    }

    case "general": {
      const typedError = error as Error;
      logger.error(typedError.message);
      return formatResponse(responseType, 500, typedError.message);
    }

    default: {
      logger.error(
        { err: error },
        "Um erro inesperado ocorreu. Tente novamente mais tarde."
      );
      return formatResponse(
        responseType,
        500,
        "Um erro inesperado ocorreu. Tente novamente mais tarde."
      );
    }
  }
};

export default handleError;
