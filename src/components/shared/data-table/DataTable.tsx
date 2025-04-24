"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  flexRender,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type TableOptions,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle, ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { TablePagination } from "./TablePagination";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  pagination: PaginationState;
  setPagination: (value: PaginationState) => void;
  sorting: SortingState;
  setSorting: (value: SortingState) => void;
  columnFilters: ColumnFiltersState;
  setColumnFilters: (value: ColumnFiltersState) => void;
  totalItems: number;
  emptyMessage?: string;
  tableClassName?: string;
  pageId?: string;
  pageSizeOptions?: number[];
  enableSelection?: boolean;
  onRowSelectionChange?: (updater: RowSelectionState) => void;
  rowSelection?: RowSelectionState;
  enableColumnVisibility?: boolean;
  showPagination?: boolean;
  getTableInstance?: (table: any) => void;
}

export function DataTable<TData>({
  columns,
  data,
  isLoading = false,
  pagination,
  setPagination,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
  totalItems,
  emptyMessage = "Nenhum resultado.",
  tableClassName,
  pageId,
  pageSizeOptions,
  enableSelection = false,
  onRowSelectionChange,
  rowSelection: externalRowSelection,
  enableColumnVisibility = true,
  showPagination = true,
  getTableInstance,
}: DataTableProps<TData>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [internalRowSelection, setInternalRowSelection] =
    useState<RowSelectionState>({});

  const rowSelection = externalRowSelection || internalRowSelection;

  const handleRowSelectionChange: TableOptions<TData>["onRowSelectionChange"] =
    (updater) => {
      const newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;

      setInternalRowSelection(newSelection);

      if (onRowSelectionChange) {
        onRowSelectionChange(newSelection);
      }
    };

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) =>
      setSorting(typeof updater === "function" ? updater(sorting) : updater),
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) =>
      setPagination(
        typeof updater === "function" ? updater(pagination) : updater
      ),
    onColumnFiltersChange: (updater) =>
      setColumnFilters(
        typeof updater === "function" ? updater(columnFilters) : updater
      ),
    onColumnVisibilityChange: enableColumnVisibility
      ? setColumnVisibility
      : undefined,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: Math.ceil(totalItems / pagination.pageSize),
    enableRowSelection: enableSelection,
    onRowSelectionChange: enableSelection
      ? handleRowSelectionChange
      : undefined,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Use useEffect to call getTableInstance after render and when row selection changes
  useEffect(() => {
    if (getTableInstance) {
      getTableInstance(table);
    }
  }, [table, getTableInstance, rowSelection]);

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "bg-background overflow-hidden rounded-md border",
          tableClassName
        )}
      >
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center h-full">
                    <LoaderCircle className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="last:py-0">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {showPagination && (
        <TablePagination
          table={table}
          pagination={pagination}
          totalItems={totalItems}
          pageSizeOptions={pageSizeOptions}
          id={pageId}
        />
      )}
    </div>
  );
}
