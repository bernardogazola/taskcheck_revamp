"use client";

import {
  ColumnDef,
  SortingState,
  RowSelectionState,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  Row,
} from "@tanstack/react-table";
import { Categoria } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { useId } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategorias,
  removeCategoria,
} from "@/lib/actions/coordenador.action";
import { toast } from "sonner";
import handleError from "@/lib/handlers/error";
import { getSelectColumn } from "@/components/shared/data-table/SelectableColumn";
import { BulkActionButton } from "@/components/shared/data-table/BulkActionButton";
import { AddButton } from "@/components/shared/data-table/AddButton";
import { TableWithToolbar } from "@/components/shared/data-table/TableWithToolbar";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Ellipsis, CircleAlert } from "lucide-react";
import CategoriaFormDialog from "@/components/coordenador/add/CategoriaFormDialog";
import EditCategoriaDialog from "@/components/coordenador/edit/EditCategoriaDialog";
import { useDebounce } from "@uidotdev/usehooks";

const multiColumnFilterFn: FilterFn<Categoria> = (
  row,
  columnId,
  filterValue
) => {
  const name = (row.original.nome || "").toLowerCase();
  const cargaHoraria = row.original.carga_horaria || "";
  const searchableRowContent = `${name} ${cargaHoraria}`;
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const CategoriasTable = () => {
  const id = useId();
  const queryClient = useQueryClient();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "nome",
      desc: false,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const searchValue = useDebounce(inputValue, 300);

  const {
    data: categoriesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", pagination, sorting, searchValue],
    queryFn: async () => {
      const sortColumn = sorting.length > 0 ? sorting[0].id : "nome";
      const sortDirection =
        sorting.length > 0 && sorting[0].desc ? "desc" : "asc";

      const response = await getCategorias({
        pagination: {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
        sorting: [
          {
            id: sortColumn,
            desc: sortDirection === "desc",
          },
        ],
        filters: searchValue ? [{ id: "nome", value: searchValue }] : [],
      });

      if (!response.success) {
        throw new Error(
          response.error?.message || "Falha ao buscar categorias"
        );
      }

      return {
        categories: response.data?.categorias || [],
        totalCategories: response.data?.total || 0,
      };
    },
  });

  const categories = (categoriesData?.categories as Categoria[]) ?? [];
  const totalCategories = categoriesData?.totalCategories ?? 0;

  const deleteCategoryMutation = useMutation({
    mutationFn: async (categoryId: number) => {
      const response = (await removeCategoria(categoryId)) as ActionResponse;
      if (!response.success) {
        throw new Error(
          response.error?.message || "Falha ao excluir categoria"
        );
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria excluída", {
        description: "A categoria foi excluída com sucesso.",
      });
    },
    onError: (error) => {
      toast.error("Falha ao excluir categoria", {
        description: "Por favor, tente novamente.",
      });
      handleError(error);
    },
  });

  const handleDeleteCategorias = async () => {
    try {
      const selectedIds: number[] = [];
      Object.keys(rowSelection).forEach((index) => {
        const categoryIndex = parseInt(index, 10);
        if (categories[categoryIndex]) {
          selectedIds.push(categories[categoryIndex].id);
        }
      });

      await Promise.all(
        selectedIds.map(async (id) => {
          return await deleteCategoryMutation.mutateAsync(id);
        })
      );

      setRowSelection({});
    } catch (error) {
      handleError(error);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [searchValue]);

  const selectedCount = Object.keys(rowSelection).length;

  const columns = useMemo<ColumnDef<Categoria>[]>(
    () => [
      getSelectColumn<Categoria>(),
      {
        header: "Nome",
        accessorKey: "nome",
        cell: ({ row }: { row: Row<Categoria> }) => (
          <div className="font-medium">{row.getValue("nome") || "—"}</div>
        ),
        size: 180,
        filterFn: multiColumnFilterFn,
        enableHiding: false,
      },
      {
        header: "Carga Horária",
        accessorKey: "carga_horaria",
        cell: ({ row }: { row: Row<Categoria> }) => (
          <div>{row.getValue("carga_horaria") || "—"}</div>
        ),
        size: 220,
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Ações</span>,
        cell: ({ row }: { row: Row<Categoria> }) => <RowActions row={row} />,
        size: 60,
        enableHiding: false,
      },
    ],
    []
  );

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-destructive">
        <p>Erro ao carregar categorias: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TableWithToolbar
        columns={columns}
        data={categories}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        searchValue={inputValue}
        onSearchChange={handleInputChange}
        searchPlaceholder="Filtrar por nome"
        filterElements={[]}
        actionElements={[
          selectedCount > 0 && (
            <BulkActionButton
              key="delete-button"
              selectedCount={selectedCount}
              onConfirmAction={handleDeleteCategorias}
              buttonText="Excluir"
              confirmText="Excluir"
              confirmationDescription={`Esta ação não pode ser revertida. Isso excluirá permanentemente ${selectedCount} ${
                selectedCount === 1 ? "categoria" : "categorias"
              }.`}
            />
          ),
          <AddButton
            key="add-button"
            label="Adicionar categoria"
            onClick={() => setAddCategoryDialogOpen(true)}
          />,
        ]}
        isLoading={isLoading}
        totalItems={totalCategories}
        emptyMessage="Nenhuma categoria encontrada."
        enableSelection={true}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        pageId={id}
      />

      <Dialog
        open={addCategoryDialogOpen}
        onOpenChange={setAddCategoryDialogOpen}
      >
        <DialogContent>
          <CategoriaFormDialog
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["categories"] });
              setAddCategoryDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriasTable;

function RowActions({ row }: { row: Row<Categoria> }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const deleteCategoriaMutation = useMutation({
    mutationFn: async () => {
      const response = (await removeCategoria(
        row.original.id
      )) as ActionResponse;
      if (!response.success) {
        throw new Error(
          response.error?.message || "Falha ao excluir categoria"
        );
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria excluída", {
        description: "A categoria foi excluída com sucesso.",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Falha ao excluir categoria", {
        description: "Por favor, tente novamente.",
      });
      handleError(error);
    },
  });

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none"
              aria-label="Editar categoria"
            >
              <Ellipsis size={16} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => setEditDialogOpen(true)}
              onSelect={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              <span>Editar</span>
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <span>Excluir</span>
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <CircleAlert className="opacity-80" size={16} />
                </div>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser revertida. Isso excluirá
                    permanentemente a categoria, e o status de todos os
                    relatórios associados a ela será alterado para
                    "Recategorização".
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteCategoriaMutation.mutate()}
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle className="text-base">Editar Categoria</DialogTitle>
            <DialogDescription>
              Atualize as informações da categoria selecionada.
            </DialogDescription>
          </DialogHeader>
          <EditCategoriaDialog
            categoria={row.original}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["categories"] });
              setEditDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
