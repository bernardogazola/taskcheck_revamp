"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface AddButtonProps {
  onClick: () => void;
  label: string;
}

export function AddButton({ onClick, label }: AddButtonProps) {
  return (
    <Button className="ml-auto" variant="outline" onClick={onClick}>
      <PlusIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
      {label}
    </Button>
  );
}
