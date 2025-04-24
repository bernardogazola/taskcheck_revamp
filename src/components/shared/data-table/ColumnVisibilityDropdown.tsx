"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Columns3Icon } from "lucide-react";
import { useState, useEffect } from "react";

interface ColumnVisibilityDropdownProps {
  table: any;
}

const ColumnVisibilityDropdown = ({ table }: ColumnVisibilityDropdownProps) => {
  // Keep track of which columns are visible
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    {}
  );

  // State to track when menu is open
  const [isOpen, setIsOpen] = useState(false);

  // Update visibility state when dropdown is opened or when table updates
  useEffect(() => {
    if (table) {
      const checkVisibility = () => {
        const newVisibility: Record<string, boolean> = {};
        table.getAllColumns().forEach((column: any) => {
          if (column.getCanHide()) {
            newVisibility[column.id] = column.getIsVisible();
          }
        });
        setVisibleColumns(newVisibility);
      };

      // Initial check
      checkVisibility();

      // When menu is open, continually check column visibility
      let interval: NodeJS.Timeout | null = null;
      if (isOpen) {
        interval = setInterval(checkVisibility, 100);
      }

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [table, isOpen]);

  if (!table) return null;

  // Handle visibility change
  const toggleColumnVisibility = (columnId: string) => {
    const column = table.getColumn(columnId);
    if (column) {
      const currentVisibility = column.getIsVisible();
      column.toggleVisibility(!currentVisibility);

      // Update our local state immediately with the new visibility
      setVisibleColumns((prev) => ({
        ...prev,
        [columnId]: !currentVisibility,
      }));
    }
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        setIsOpen(open);

        // When dropdown opens, refresh visible columns state
        if (open) {
          const refreshedState: Record<string, boolean> = {};
          table.getAllColumns().forEach((column: any) => {
            if (column.getCanHide()) {
              refreshedState[column.id] = column.getIsVisible();
            }
          });
          setVisibleColumns(refreshedState);
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Columns3Icon
            className="-ms-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Visualizar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Alternar colunas</DropdownMenuLabel>
        {table
          .getAllColumns()
          .filter((column: any) => column.getCanHide())
          .map((column: any) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={visibleColumns[column.id] ?? false}
              onCheckedChange={() => toggleColumnVisibility(column.id)}
              onSelect={(event) => event.preventDefault()}
            >
              {column.columnDef.header?.toString()}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnVisibilityDropdown;
