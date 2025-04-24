"use server";

import action from "@/lib/handlers/action";
import supabase from "@/lib/supabase/client";
import handleError from "@/lib/handlers/error";
import { z } from "zod";
import slugify from "slugify";
import uniqueSlug from "unique-slug";

export async function uploadFile(file: File) {
  const validationResult = await action({
    params: { file },
    schema: z.object({
      file: z
        .instanceof(File)
        .refine((file) => file.size > 0, {
          message: "O arquivo não pode ser vazio",
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "O arquivo deve ter no máximo 5MB",
        })
        .refine((file) => file.type === "application/pdf", {
          message: "O arquivo deve estar no formato PDF",
        }),
    }),
    authorize: true,
    requiredRole: "aluno",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const filename = slugify(file.name + "-" + uniqueSlug(), {
      replacement: "-",
      lower: true,
      strict: true,
      locale: "en",
      trim: true,
    });

    const { data, error } = await supabase.storage
      .from("certificado")
      .upload(filename, file, {
        upsert: true,
      });

    console.log("filename", filename);

    console.log(data, error);
    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function downloadFile(filename: string) {
  const validationResult = await action({
    params: { filename },
    schema: z.object({
      filename: z.string().min(1, {
        message: "O nome do arquivo é obrigatório",
      }),
    }),
    authorize: true,
    requiredRole: "aluno",
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const { data, error } = await supabase.storage
      .from("certificado")
      .download(filename);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
