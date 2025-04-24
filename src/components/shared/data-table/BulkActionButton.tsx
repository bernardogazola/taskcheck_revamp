"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LucideIcon, TrashIcon, CircleAlertIcon } from "lucide-react";
import { ReactNode } from "react";
import { ComponentProps } from "react";

interface BulkActionButtonProps {
  selectedCount: number;
  onConfirmAction: () => Promise<void>;
  icon?: LucideIcon;
  buttonText?: string;
  buttonVariant?: ComponentProps<typeof Button>["variant"];
  confirmationTitle?: string;
  confirmationDescription?: string;
  confirmationIcon?: ReactNode;
  cancelText?: string;
  confirmText?: string;
  countLabel?: string;
  minSelectionCount?: number;
}

export function BulkActionButton({
  selectedCount,
  onConfirmAction,
  icon: Icon = TrashIcon,
  buttonText = "Excluir",
  buttonVariant = "destructive",
  confirmationTitle = "Tem certeza?",
  confirmationDescription,
  confirmationIcon = <CircleAlertIcon className="opacity-80" size={16} />,
  cancelText = "Cancelar",
  confirmText = "Confirmar",
  countLabel,
  minSelectionCount = 1,
}: BulkActionButtonProps) {
  if (selectedCount < minSelectionCount) return null;

  const description =
    confirmationDescription ||
    `Esta ação não pode ser revertida. Isso afetará ${selectedCount} ${
      selectedCount === 1 ? "item selecionado" : "itens selecionados"
    }.`;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="ml-auto" variant={buttonVariant}>
          <Icon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
          {buttonText}
          {countLabel !== undefined ? (
            <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
              {countLabel}
            </span>
          ) : selectedCount > 0 ? (
            <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
              {selectedCount}
            </span>
          ) : null}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            {confirmationIcon}
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmationTitle}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmAction}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
