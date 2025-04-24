"use client";

import { ReactNode, useEffect, useState } from "react";
import { TableToolbar } from "./TableToolbar";
import { DataTable } from "./DataTable";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";

type ActionElement = ReactNode;

interface TableWithToolbarProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];

  // State
  pagination: PaginationState;
  setPagination: (value: PaginationState) => void;
  sorting: SortingState;
  setSorting: (value: SortingState) => void;
  columnFilters: ColumnFiltersState;
  setColumnFilters: (value: ColumnFiltersState) => void;

  // Search
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  // Filtering
  filterElements?: ReactNode | ReactNode[];

  // Actions
  actionElements?: ActionElement | ActionElement[];

  // Table props
  isLoading?: boolean;
  totalItems: number;
  emptyMessage?: string;
  tableClassName?: string;

  // Selection
  enableSelection?: boolean;
  onRowSelectionChange?: (updater: RowSelectionState) => void;
  rowSelection?: RowSelectionState;

  // Other options
  pageId?: string;
  pageSizeOptions?: number[];
  enableColumnVisibility?: boolean;
  showPagination?: boolean;
  toolbarClassName?: string;

  className?: string;
}

export function TableWithToolbar<TData>({
  columns,
  data,
  pagination,
  setPagination,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Filtrar...",
  filterElements,
  actionElements,
  isLoading = false,
  totalItems,
  emptyMessage,
  tableClassName,
  enableSelection = false,
  onRowSelectionChange,
  rowSelection,
  pageId,
  pageSizeOptions,
  enableColumnVisibility = true,
  showPagination = true,
  toolbarClassName,
  className,
}: TableWithToolbarProps<TData>) {
  const [tableInstance, setTableInstance] = useState<any>(null);

  // Prepare search props if search is enabled
  const searchProps = onSearchChange
    ? {
        id: pageId || "search",
        value: searchValue,
        onChange: onSearchChange,
        placeholder: searchPlaceholder,
      }
    : undefined;

  const handleGetTableInstance = (table: any) => {
    if (table && !tableInstance) {
      setTableInstance(table);
    }
  };

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      setTableInstance(null);
    };
  }, []);

  return (
    <div className={`space-y-4 ${className || ""}`}>
      {/* Toolbar */}
      <TableToolbar
        table={tableInstance}
        searchProps={searchProps}
        filterElements={filterElements}
        actionElements={actionElements}
        className={toolbarClassName}
      />

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        totalItems={totalItems}
        emptyMessage={emptyMessage}
        tableClassName={tableClassName}
        pageId={pageId}
        pageSizeOptions={pageSizeOptions}
        enableSelection={enableSelection}
        onRowSelectionChange={onRowSelectionChange}
        rowSelection={rowSelection}
        enableColumnVisibility={enableColumnVisibility}
        showPagination={showPagination}
        getTableInstance={handleGetTableInstance}
      />
    </div>
  );
}
