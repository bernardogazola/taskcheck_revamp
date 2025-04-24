"use client";

import { useId, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addCategoria } from "@/lib/actions/coordenador.action";
import handleError from "@/lib/handlers/error";
import {
  CategoriaFormData,
  categoriaSchema,
} from "@/lib/validators/coordenadorSchema";
interface AddCategoriaDialogProps {
  onSuccess?: () => void;
}

export default function AddCategoriaDialog({
  onSuccess,
}: AddCategoriaDialogProps) {
  const id = useId();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const addCategoriaMutation = useMutation({
    mutationFn: async (formData: CategoriaFormData) => {
      const response = (await addCategoria(formData)) as ActionResponse;
      if (!response.success) {
        throw new Error(
          response.error?.message || "Falha ao adicionar categoria"
        );
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
      toast.success("Categoria adicionada", {
        description: "A categoria foi adicionada com sucesso.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Falha ao adicionar categoria", {
        description: error.message,
      });
    },
  });

  // Initialize form with default values
  const form = useForm({
    defaultValues: {
      nome: "",
      descricao: "",
      carga_horaria: 0,
    },
    validators: {
      onChange: categoriaSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      await addCategoriaMutation.mutateAsync(value);
    },
  });

  return (
    <>
      <DialogHeader className="text-left">
        <DialogTitle className="text-base">Adicionar Categoria</DialogTitle>
        <DialogDescription>
          Adicione uma nova categoria ao sistema com as informações desejadas.
        </DialogDescription>
      </DialogHeader>

      <div className="py-4">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="nome">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={`${id}-nome`}>Nome</Label>
                <Input
                  id={`${id}-nome`}
                  placeholder="Nome da categoria"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={
                    field.state.meta.isTouched &&
                    !!field.state.meta.errors.length
                  }
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {(field.state.meta.errors[0] as any)?.message}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          <form.Field name="descricao">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={`${id}-descricao`}>Descrição</Label>
                <Input
                  id={`${id}-descricao`}
                  placeholder="Descrição da categoria"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={
                    field.state.meta.isTouched &&
                    !!field.state.meta.errors.length
                  }
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {(field.state.meta.errors[0] as any)?.message}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          <form.Field name="carga_horaria">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={`${id}-carga_horaria`}>Carga Horária</Label>
                <Input
                  id={`${id}-carga_horaria`}
                  type="number"
                  placeholder="Carga horária da categoria"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  aria-invalid={
                    field.state.meta.isTouched &&
                    !!field.state.meta.errors.length
                  }
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {(field.state.meta.errors[0] as any)?.message}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          {serverError && (
            <p className="text-sm text-destructive">{serverError}</p>
          )}
        </form>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </DialogClose>
        <form.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting || addCategoriaMutation.isPending,
          ]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="button"
              variant="default"
              disabled={!canSubmit || isSubmitting}
              onClick={() => form.handleSubmit()}
            >
              {isSubmitting && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Adicionar Categoria
            </Button>
          )}
        />
      </DialogFooter>
    </>
  );
}
