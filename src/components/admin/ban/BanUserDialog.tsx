"use client";

import { useId, useState, useEffect } from "react";
import { BanIcon, LoaderCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { useCharacterLimit } from "@/hooks/use-character-limit";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { banUser } from "@/lib/actions/admin.action";
import handleError from "@/lib/handlers/error";

interface BanUserDialogProps {
  userId: string;
  username: string;
  onSuccess?: () => void;
}

interface BanFormData {
  duration: string;
  timeUnit: string;
  reason: string;
}

// Time unit options with singular and plural forms
const timeUnits = {
  seconds: { singular: "Segundo", plural: "Segundos" },
  days: { singular: "Dia", plural: "Dias" },
  months: { singular: "Mês", plural: "Meses" },
  years: { singular: "Ano", plural: "Anos" },
  permanent: { singular: "Permanente", plural: "Permanente" },
};

// Ban form validation schema
const banFormSchema = z.object({
  duration: z
    .string()
    .min(1, "A duração é obrigatória")
    .optional()
    .or(z.literal("0")),
  timeUnit: z.string().min(1, "A unidade de tempo é obrigatória"),
  reason: z.string().min(1, "O motivo do banimento é obrigatório"),
});

export default function BanUserDialog({
  userId,
  username,
  onSuccess,
}: BanUserDialogProps) {
  const id = useId();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const [timeUnitLabels, setTimeUnitLabels] = useState<Record<string, string>>(
    Object.fromEntries(
      Object.entries(timeUnits).map(([key, { plural }]) => [key, plural])
    )
  );

  const maxLength = 180;

  // Calculate expiration date based on duration and time unit
  const calculateExpiresAt = (
    duration: string,
    timeUnit: string
  ): Date | undefined => {
    if (timeUnit === "permanent") return undefined;

    const durationNum = parseInt(duration, 10);
    if (isNaN(durationNum) || durationNum <= 0) return undefined;

    const now = new Date();

    switch (timeUnit) {
      case "seconds":
        return new Date(now.getTime() + durationNum * 1000);
      case "days":
        return new Date(now.getTime() + durationNum * 24 * 60 * 60 * 1000);
      case "months":
        const newMonth = now.getMonth() + durationNum;
        return new Date(now.setMonth(newMonth));
      case "years":
        return new Date(now.setFullYear(now.getFullYear() + durationNum));
      default:
        return undefined;
    }
  };

  // Ban user mutation
  const banUserMutation = useMutation({
    mutationFn: async (formData: BanFormData) => {
      const expiresAt = calculateExpiresAt(
        formData.duration,
        formData.timeUnit
      );
      const response = (await banUser(
        userId,
        formData.reason,
        expiresAt
      )) as ActionResponse;

      if (!response.success) {
        throw new Error(response.error?.message || "Falha ao banir usuário");
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuário banido", {
        description: "O usuário foi banido com sucesso.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Falha ao banir usuário", {
        description: error.message,
      });
    },
  });

  // Initialize form
  const form = useForm({
    defaultValues: {
      duration: "1",
      timeUnit: "days",
      reason: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      await banUserMutation.mutateAsync(value);
    },
  });

  const isPermanent = form.state.values.timeUnit === "permanent";

  // Update time unit labels based on duration value
  const updateTimeUnitLabels = (duration: string) => {
    const durationNum = parseInt(duration, 10);
    if (!isNaN(durationNum)) {
      const labels = Object.fromEntries(
        Object.entries(timeUnits).map(([key, { singular, plural }]) => {
          return [key, durationNum === 1 ? singular : plural];
        })
      );
      setTimeUnitLabels(labels);
    }
  };

  // Initialize labels on mount
  useEffect(() => {
    updateTimeUnitLabels(form.state.values.duration);
  }, []);

  return (
    <>
      <DialogHeader className="text-left">
        <DialogTitle className="text-base">Banir Usuário</DialogTitle>
        <DialogDescription>
          Bana um usuário de acessar a plataforma por um período específico.
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
          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-username`}>Usuário</Label>
            <div className="relative">
              <Input
                id={`${id}-username`}
                className="peer"
                placeholder="Usuário"
                type="text"
                value={username}
                disabled
              />
            </div>
          </div>

          <form.Field name="timeUnit">
            {(field) => (
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-duration`}>Duração do Banimento</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <form.Field name="duration">
                      {(durationField) => (
                        <Input
                          id={`${id}-duration`}
                          type="number"
                          min="1"
                          value={durationField.state.value}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            durationField.handleChange(newValue);
                            updateTimeUnitLabels(newValue);
                          }}
                          onBlur={durationField.handleBlur}
                          disabled={isPermanent}
                          aria-invalid={
                            durationField.state.meta.errors.length > 0
                          }
                          required={!isPermanent}
                        />
                      )}
                    </form.Field>
                  </div>
                  <div className="w-1/2">
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => {
                        field.handleChange(value);
                        if (value === "permanent") {
                          form.setFieldValue("duration", "0");
                          // Update labels for permanent
                          updateTimeUnitLabels("0");
                        } else if (form.state.values.duration === "0") {
                          const newDuration = "1";
                          form.setFieldValue("duration", newDuration);
                          // Update labels for the new duration
                          updateTimeUnitLabels(newDuration);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seconds">
                          {timeUnitLabels.seconds}
                        </SelectItem>
                        <SelectItem value="days">
                          {timeUnitLabels.days}
                        </SelectItem>
                        <SelectItem value="months">
                          {timeUnitLabels.months}
                        </SelectItem>
                        <SelectItem value="years">
                          {timeUnitLabels.years}
                        </SelectItem>
                        <SelectItem value="permanent">
                          {timeUnitLabels.permanent}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive mt-1">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="reason">
            {(field) => (
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-reason`}>Motivo do Banimento</Label>
                <Textarea
                  id={`${id}-reason`}
                  placeholder="Explique o motivo deste banimento..."
                  value={field.state.value}
                  maxLength={maxLength}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-describedby={`${id}-description`}
                  aria-invalid={field.state.meta.errors.length > 0}
                  required
                />
                <p
                  id={`${id}-description`}
                  className="text-muted-foreground mt-2 text-right text-xs"
                  role="status"
                  aria-live="polite"
                >
                  <span className="tabular-nums">
                    {maxLength - field.state.value.length}
                  </span>{" "}
                  caracteres restantes
                </p>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {String(field.state.meta.errors[0])}
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
            state.isSubmitting || banUserMutation.isPending,
          ]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="button"
              variant="destructive"
              disabled={!canSubmit || isSubmitting}
              onClick={() => form.handleSubmit()}
            >
              {isSubmitting && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Banir Usuário
            </Button>
          )}
        />
      </DialogFooter>
    </>
  );
}
