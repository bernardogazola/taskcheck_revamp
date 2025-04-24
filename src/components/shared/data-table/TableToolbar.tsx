"use client";

import { ReactNode } from "react";
import TableSearchInput from "./TableSearchInput";
import ColumnVisibilityDropdown from "./ColumnVisibilityDropdown";

interface TableToolbarProps<TData> {
  table: any;
  searchProps?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    id: string;
  };
  filterElements?: ReactNode | ReactNode[];
  actionElements?: ReactNode | ReactNode[];
  className?: string;
}

export function TableToolbar<TData>({
  table,
  searchProps,
  filterElements,
  actionElements,
  className,
}: TableToolbarProps<TData>) {
  // Process arrays and filter out falsy values
  const processElements = (
    elements: ReactNode | ReactNode[] | undefined
  ): ReactNode[] => {
    if (!elements) return [];

    if (Array.isArray(elements)) {
      return elements.filter(Boolean);
    }

    return [elements];
  };

  const processedFilterElements = processElements(filterElements);
  const processedActionElements = processElements(actionElements);

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 ${
        className || ""
      }`}
    >
      <div className="flex items-center gap-3 flex-wrap">
        {searchProps && <TableSearchInput {...searchProps} />}
        {processedFilterElements.map((element, i) => (
          <div key={i}>{element}</div>
        ))}
        {table && <ColumnVisibilityDropdown table={table} />}
      </div>
      {processedActionElements.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap ml-auto">
          {processedActionElements.map((element, i) => (
            <div key={i}>{element}</div>
          ))}
        </div>
      )}
    </div>
  );
}
