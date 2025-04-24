"use client";

import { useId, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

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
import { addActivity, getAllCategories } from "@/lib/actions/aluno.action";
import { Textarea } from "@/components/ui/textarea";
import { SelectItem } from "@/components/ui/select";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Categoria } from "@prisma/client";
interface AddRelatorioDialogProps {
  onSuccess?: () => void;
}

const AddRelatorioDialog = ({ onSuccess }: AddRelatorioDialogProps) => {
  const id = useId();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    data: categoriasData,
    isLoading: isLoadingCategorias,
    error,
  } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => await getAllCategories(),
  });

  const categorias = categoriasData?.data || [];

  const addRelatorioMutation = useMutation({
    mutationFn: async (formData: RelatorioFormData) => {
      const response = (await addActivity(formData)) as ActionResponse;
      if (!response.success) {
        throw new Error(
          response.error?.message || "Falha ao adicionar relatório"
        );
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atividades"] });
      toast.success("Relatório adicionado", {
        description: "O relatório foi adicionado com sucesso.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Falha ao adicionar relatório", {
        description: error.message,
      });
    },
  });

  // Initialize form with default values
  const form = useForm({
    defaultValues: {
      nome: "",
      texto_reflexao: "",
      data_realizacao: "",
      id_categoria: "",
      certificado: new File([""], "No file chosen"),
      // TODO: Add certificado
      //   certificado: null,
    },
    validators: {
      onChange: relatorioSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      await addRelatorioMutation.mutateAsync(value);
    },
  });

  return (
    <>
      <DialogHeader className="text-left">
        <DialogTitle className="text-base">Adicionar Atividade</DialogTitle>
        <DialogDescription>
          Adicione um novo relatório de atividade ao sistema com as informações
          desejadas.
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
                  placeholder="Nome da atividade"
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

          <form.Field name="texto_reflexao">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={`${id}-texto_reflexao`}>
                  Texto de Reflexão
                </Label>
                <Textarea
                  id={id}
                  placeholder="Texto de Reflexão"
                  className="field-sizing-content max-h-29.5 min-h-0 resize-none py-1.75"
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
                  disabled={isLoadingCategorias}
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
                      categorias.map((categoria: Categoria) => (
                        <SelectItem
                          key={categoria.id}
                          value={categoria.id.toString()}
                        >
                          {categoria.nome}
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
                <Label htmlFor={`${id}-certificado`}>Upload de Arquivos</Label>
                <Input
                  id={`${id}-certificado`}
                  type="file"
                  onChange={(e) => {
                    field.handleChange(e.target.files![0]);
                  }}
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
            state.isSubmitting || addRelatorioMutation.isPending,
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
              Adicionar Atividade
            </Button>
          )}
        />
      </DialogFooter>
    </>
  );
};

export default AddRelatorioDialog;
