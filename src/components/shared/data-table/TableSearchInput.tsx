"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { ListFilterIcon, CircleXIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id: string;
}

const TableSearchInput = ({
  value,
  onChange,
  placeholder = "Filtrar...",
  id,
}: TableSearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <Input
        id={`${id}-input`}
        ref={inputRef}
        className={cn("peer min-w-60 ps-9", Boolean(value) && "pe-9")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="text"
        aria-label={placeholder}
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <ListFilterIcon size={16} aria-hidden="true" />
      </div>
      {Boolean(value) && (
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Limpar filtro"
          onClick={() => {
            onChange("");
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          <CircleXIcon size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default TableSearchInput;
