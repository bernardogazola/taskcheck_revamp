"use client";

import { useId, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editCategoria } from "@/lib/actions/coordenador.action";
import {
  CategoriaFormData,
  categoriaSchema,
} from "@/lib/validators/coordenadorSchema";
import { Categoria } from "@prisma/client";

interface EditCategoriaDialogProps {
  categoria: Categoria;
  onSuccess?: () => void;
}

export default function EditCategoriaDialog({
  categoria,
  onSuccess,
}: EditCategoriaDialogProps) {
  const id = useId();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const editCategoriaMutation = useMutation({
    mutationFn: async (formData: CategoriaFormData) => {
      const response = (await editCategoria(
        categoria.id,
        formData
      )) as ActionResponse;
      if (!response.success) {
        throw new Error(response.error?.message || "Falha ao editar categoria");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categoria", categoria.id] });
      toast.success("Categoria atualizada", {
        description: "A categoria foi atualizada com sucesso.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Falha ao atualizar categoria", {
        description: error.message,
      });
    },
  });

  const form = useForm({
    defaultValues: {
      nome: categoria.nome,
      descricao: categoria.descricao,
      carga_horaria: categoria.carga_horaria,
    },
    validators: {
      onChange: categoriaSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      await editCategoriaMutation.mutateAsync(value);
    },
  });

  return (
    <>
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
            state.isSubmitting || editCategoriaMutation.isPending,
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
              Salvar Alterações
            </Button>
          )}
        />
      </DialogFooter>
    </>
  );
}
