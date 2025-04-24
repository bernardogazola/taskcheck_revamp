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
import { Categoria, Curso } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { useId } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useDebounce } from "@uidotdev/usehooks";
import { deleteCurso, getAllCursos } from "@/lib/actions/admin.action";
import CursoFormDialog from "@/components/admin/cursos/add/CursoFormDialog";

const multiColumnFilterFn: FilterFn<Curso> = (row, columnId, filterValue) => {
  const name = (row.original.nome || "").toLowerCase();
  const horasComplementaresObrigatorias =
    row.original.horasComplementaresObrigatorias || "";
  const searchableRowContent = `${name} ${horasComplementaresObrigatorias}`;
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const CursosTable = () => {
  const id = useId();
  const queryClient = useQueryClient();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [addCursoDialogOpen, setAddCursoDialogOpen] = useState(false);
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
    data: cursosData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cursos", pagination, sorting, searchValue],
    queryFn: async () => {
      const sortColumn = sorting.length > 0 ? sorting[0].id : "nome";
      const sortDirection =
        sorting.length > 0 && sorting[0].desc ? "desc" : "asc";

      const response = await getAllCursos({
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
        throw new Error(response.error?.message || "Falha ao buscar cursos");
      }

      return {
        cursos: response.data?.cursos || [],
        totalCursos: response.data?.total || 0,
      };
    },
  });

  const cursos = (cursosData?.cursos as Curso[]) ?? [];
  const totalCursos = cursosData?.totalCursos ?? 0;

  const deleteCursoMutation = useMutation({
    mutationFn: async (cursoId: number) => {
      const response = (await deleteCurso(cursoId)) as ActionResponse;
      if (!response.success) {
        throw new Error(response.error?.message || "Falha ao excluir curso");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
      toast.success("Curso excluído", {
        description: "O curso foi excluído com sucesso.",
      });
    },
    onError: (error) => {
      toast.error("Falha ao excluir curso", {
        description: "Por favor, tente novamente.",
      });
      handleError(error);
    },
  });

  const handleDeleteCursos = async () => {
    try {
      const selectedIds: number[] = [];
      Object.keys(rowSelection).forEach((index) => {
        const cursoIndex = parseInt(index, 10);
        if (cursos[cursoIndex]) {
          selectedIds.push(cursos[cursoIndex].id);
        }
      });

      await Promise.all(
        selectedIds.map(async (id) => {
          return await deleteCursoMutation.mutateAsync(id);
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

  const columns = useMemo<ColumnDef<Curso>[]>(
    () => [
      getSelectColumn<Curso>(),
      {
        header: "Nome",
        accessorKey: "nome",
        cell: ({ row }: { row: Row<Curso> }) => (
          <div className="font-medium">{row.getValue("nome") || "—"}</div>
        ),
        size: 180,
        filterFn: multiColumnFilterFn,
        enableHiding: false,
      },
      {
        header: "Horas Complementares",
        accessorKey: "horasComplementaresObrigatorias",
        cell: ({ row }: { row: Row<Curso> }) => (
          <div>{row.getValue("horasComplementaresObrigatorias") || "—"}</div>
        ),
        size: 220,
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Ações</span>,
        cell: ({ row }: { row: Row<Curso> }) => <RowActions row={row} />,
        size: 60,
        enableHiding: false,
      },
    ],
    []
  );

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-destructive">
        <p>Erro ao carregar cursos: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TableWithToolbar
        columns={columns}
        data={cursos}
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
              onConfirmAction={handleDeleteCursos}
              buttonText="Excluir"
              confirmText="Excluir"
              confirmationDescription={`Esta ação não pode ser revertida. Isso excluirá permanentemente ${selectedCount} ${
                selectedCount === 1 ? "curso" : "cursos"
              }.`}
            />
          ),
          <AddButton
            key="add-button"
            label="Adicionar curso"
            onClick={() => setAddCursoDialogOpen(true)}
          />,
        ]}
        isLoading={isLoading}
        totalItems={totalCursos}
        emptyMessage="Nenhum curso encontrado."
        enableSelection={true}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        pageId={id}
      />

      <Dialog open={addCursoDialogOpen} onOpenChange={setAddCursoDialogOpen}>
        <DialogContent>
          <CursoFormDialog
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["cursos"] });
              setAddCursoDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

function RowActions({ row }: { row: Row<Curso> }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const deleteCursoMutation = useMutation({
    mutationFn: async () => {
      const response = (await deleteCurso(row.original.id)) as ActionResponse;
      if (!response.success) {
        throw new Error(response.error?.message || "Falha ao excluir curso");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cursos"] });
      toast.success("Curso excluído", {
        description: "O curso foi excluído com sucesso.",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Falha ao excluir curso", {
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
              aria-label="Editar curso"
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
                    permanentemente o curso.
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteCursoMutation.mutate()}>
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
              Atualize as informações do curso selecionado.
            </DialogDescription>
          </DialogHeader>
          {/* <EditCursoDialog
            categoria={row.original}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["categories"] });
              setEditDialogOpen(false);
            }}
          /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CursosTable;
