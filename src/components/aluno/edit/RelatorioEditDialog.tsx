// src/components/aluno/edit/RelatorioEditDialog.tsx
"use client";

import { useId, useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { format } from "date-fns";

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
  RelatorioFormData,
  relatorioSchema,
} from "@/lib/validators/reportSchema";
import { editActivity, getAllCategories } from "@/lib/actions/aluno.action";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Categoria, RelatorioAtividade, StatusRelatorio } from "@prisma/client";
import { ptBR } from "date-fns/locale";

// Reuse the type from RelatoriosTable if possible, or redefine/import
type AtividadeWithRelations = RelatorioAtividade & {
  categoria: {
    id: number;
    nome: string;
    carga_horaria: number;
  };
  feedbacks: any[]; // Adjust type as needed
};

interface EditRelatorioDialogProps {
  relatorio: AtividadeWithRelations;
  onSuccess?: () => void;
}

const RelatorioEditDialog = ({
  relatorio,
  onSuccess,
}: EditRelatorioDialogProps) => {
  const id = useId();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    data: categoriasData,
    isLoading: isLoadingCategorias,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => await getAllCategories(),
  });

  const categorias = categoriasData?.data || [];

  const editRelatorioMutation = useMutation({
    mutationFn: async (formData: RelatorioFormData) => {
      const response = (await editActivity(
        relatorio.id,
        formData
      )) as ActionResponse;
      if (!response.success) {
        throw new Error(response.error?.message || "Falha ao editar relatório");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atividades"] });
      toast.success("Relatório atualizado", {
        description: "O relatório foi atualizado com sucesso.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      setServerError(error.message);
      toast.error("Falha ao atualizar relatório", {
        description: error.message,
      });
    },
  });

  const formattedDate = format(
    new Date(relatorio.data_realizacao),
    "yyyy-MM-dd"
  );

  const form = useForm({
    defaultValues: {
      nome: relatorio.nome,
      texto_reflexao: relatorio.texto_reflexao,
      data_realizacao: formattedDate,
      id_categoria: relatorio.id_categoria.toString(),
      certificado: new File([""], "No file chosen", {
        type: "application/pdf",
      }),
    },
    validators: {
      onChange: relatorioSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      await editRelatorioMutation.mutateAsync(value);
    },
  });

  const isFormDisabled =
    relatorio.status !== StatusRelatorio.AGUARDANDO_VALIDACAO ||
    editRelatorioMutation.isPending;

  useEffect(() => {
    if (categoriesError) {
      toast.error("Erro ao carregar categorias", {
        description: categoriesError.message,
      });
    }
  }, [categoriesError]);

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
                  placeholder="Nome da atividade"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={isFormDisabled}
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

          <form.Field name="texto_reflexao">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={`${id}-texto_reflexao`}>
                  Texto de Reflexão
                </Label>
                <Textarea
                  id={`${id}-texto_reflexao`}
                  placeholder="Texto de Reflexão"
                  className="field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={isFormDisabled}
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

          <form.Field name="data_realizacao">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={`${id}-data_realizacao`}>
                  Data de Realização
                </Label>
                <Input
                  id={`${id}-data_realizacao`}
                  placeholder="Data de Realização"
                  type="date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={isFormDisabled}
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

          <form.Field name="id_categoria">
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor={`${id}-id_categoria`}>Categoria</Label>
                <Select
                  onValueChange={(value) => field.handleChange(value)}
                  value={field.state.value}
                  disabled={isLoadingCategorias || isFormDisabled}
                >
                  <SelectTrigger
                    id={`${id}-id_categoria`}
                    className="w-full"
                    aria-invalid={
                      field.state.meta.isTouched &&
                      !!field.state.meta.errors.length
                    }
                  >
                    <SelectValue
                      placeholder={
                        isLoadingCategorias
                          ? "Carregando categorias..."
                          : "Selecione uma categoria"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {!isLoadingCategorias &&
                      categorias.map((cat: Categoria) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.nome}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {(field.state.meta.errors[0] as any)?.message}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          <form.Field name="certificado">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={`${id}-certificado`}>
                  Certificado (Opcional: Anexe para substituir)
                </Label>
                {relatorio.certificado && (
                  <p className="text-xs text-muted-foreground">
                    Arquivo atual: {relatorio.certificado.split("/").pop()}
                  </p>
                )}
                <Input
                  id={`${id}-certificado`}
                  type="file"
                  onChange={(e) => {
                    field.handleChange(e.target.files![0]);
                  }}
                  onBlur={field.handleBlur}
                  disabled={isFormDisabled}
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
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="button"
              variant="default"
              disabled={!canSubmit || isSubmitting || isFormDisabled}
              onClick={() => form.handleSubmit()}
            >
              {(isSubmitting || editRelatorioMutation.isPending) && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Salvar Alterações
            </Button>
          )}
        />
      </DialogFooter>
    </>
  );
};

export default RelatorioEditDialog;
