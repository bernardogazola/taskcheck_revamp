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
import { addUser } from "@/lib/actions/admin.action";
import handleError from "@/lib/handlers/error";

interface AddUserDialogProps {
  onSuccess?: () => void;
}

// Roles available for selection
const AVAILABLE_ROLES = [
  { value: "aluno", label: "Aluno" },
  { value: "professor", label: "Professor" },
  { value: "coordenador", label: "Coordenador" },
  { value: "admin", label: "Administrador" },
];

export default function AddUserDialog({ onSuccess }: AddUserDialogProps) {
  const id = useId();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("aluno");
  const [cursoIds, setCursoIds] = useState<string>("");

  // Add user mutation
  const addUserMutation = useMutation({
    mutationFn: async (formData: AddUserParams) => {
      // Process form data based on role
      const processedData = { ...formData };

      if (selectedRole === "professor" && cursoIds) {
        processedData.curso_ids = cursoIds
          .split(",")
          .map((v) => {
            const num = Number(v.trim());
            return isNaN(num) ? 0 : num;
          })
          .filter((n) => n > 0);
      }

      const response = (await addUser(processedData)) as ActionResponse;
      if (!response.success) {
        throw new Error(
          response.error?.message || "Falha ao adicionar usuário"
        );
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuário adicionado", {
        description: "O usuário foi adicionado com sucesso.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Falha ao adicionar usuário", {
        description: error.message,
      });
    },
  });

  // Initialize form with default values
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "aluno", // Default role
      // Role-specific fields with default values
      matricula: 0,
      id_curso: 0,
      id_curso_responsavel: 0,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      await addUserMutation.mutateAsync(value);
    },
  });

  return (
    <>
      <DialogHeader className="text-left">
        <DialogTitle className="text-base">Adicionar Usuário</DialogTitle>
        <DialogDescription>
          Adicione um novo usuário ao sistema com as informações e cargo
          desejados.
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
          <form.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>Nome</Label>
                <Input
                  id={`${id}-name`}
                  placeholder="Nome completo"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  required
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

          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={`${id}-email`}>Email</Label>
                <Input
                  id={`${id}-email`}
                  type="email"
                  placeholder="usuario@exemplo.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  required
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

          <form.Field name="password">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={`${id}-password`}>Senha</Label>
                <Input
                  id={`${id}-password`}
                  type="password"
                  placeholder="Senha"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={field.state.meta.errors.length > 0}
                  required
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

          <form.Field name="role">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={`${id}-role`}>Cargo</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => {
                    field.handleChange(value);
                    setSelectedRole(value);
                  }}
                >
                  <SelectTrigger id={`${id}-role`}>
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_ROLES.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
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

          {/* Role-specific fields */}
          {selectedRole === "aluno" && (
            <>
              <form.Field name="matricula">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={`${id}-matricula`}>Matrícula</Label>
                    <Input
                      id={`${id}-matricula`}
                      type="number"
                      placeholder="Número de matrícula"
                      value={field.state.value || ""}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={field.state.meta.errors.length > 0}
                      required
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

              <form.Field name="id_curso">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={`${id}-id_curso`}>ID do Curso</Label>
                    <Input
                      id={`${id}-id_curso`}
                      type="number"
                      placeholder="Identificador do curso"
                      value={field.state.value || ""}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={field.state.meta.errors.length > 0}
                      required
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
            </>
          )}

          {selectedRole === "professor" && (
            <div className="space-y-2">
              <Label htmlFor={`${id}-curso_ids`}>IDs dos Cursos</Label>
              <Input
                id={`${id}-curso_ids`}
                placeholder="IDs dos cursos separados por vírgula (ex: 1,2,3)"
                value={cursoIds}
                onChange={(e) => setCursoIds(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Digite os IDs dos cursos separados por vírgula
              </p>
            </div>
          )}

          {selectedRole === "coordenador" && (
            <form.Field name="id_curso_responsavel">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={`${id}-id_curso_responsavel`}>
                    ID do Curso Responsável
                  </Label>
                  <Input
                    id={`${id}-id_curso_responsavel`}
                    type="number"
                    placeholder="Identificador do curso responsável"
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                    aria-invalid={field.state.meta.errors.length > 0}
                    required
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
          )}

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
            state.isSubmitting || addUserMutation.isPending,
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
              Adicionar Usuário
            </Button>
          )}
        />
      </DialogFooter>
    </>
  );
}
