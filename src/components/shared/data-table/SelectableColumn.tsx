"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { type Row } from "@tanstack/react-table";

export function getSelectColumn<TData>() {
  return {
    id: "select",
    header: ({ table }: { table: any }) => (
      <div className="flex h-full items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar todos"
        />
      </div>
    ),
    cell: ({ row }: { row: Row<TData> }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecionar linha"
        />
      </div>
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  };
}
