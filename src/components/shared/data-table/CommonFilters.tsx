"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterIcon } from "lucide-react";

interface CheckboxFilterProps {
  id: string;
  label: string;
  options: { value: string; label: string; count?: number }[];
  selectedValues: string[];
  onChange: (checked: boolean, value: string) => void;
}

export function CheckboxFilter({
  id,
  label,
  options,
  selectedValues,
  onChange,
}: CheckboxFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FilterIcon
            className="-ms-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
          {label}
          {selectedValues.length > 0 && (
            <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
              {selectedValues.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-36 p-3" align="start">
        <div className="space-y-3">
          <div className="text-muted-foreground text-xs font-medium">
            Filtros
          </div>
          <div className="space-y-3">
            {options.map((option, i) => (
              <div key={option.value} className="flex items-center gap-2">
                <Checkbox
                  id={`${id}-${i}`}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked: boolean) =>
                    onChange(checked, option.value)
                  }
                />
                <Label
                  htmlFor={`${id}-${i}`}
                  className="flex grow justify-between gap-2 font-normal"
                >
                  {option.label}{" "}
                  {option.count !== undefined && (
                    <span className="text-muted-foreground ms-2 text-xs">
                      {option.count}
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Generic filter types that can be extended
export type FilterConfig = {
  id: string;
  type: string;
  [key: string]: any;
};

export type FilterState = {
  [key: string]: any;
};

// Other filter components can be added here
