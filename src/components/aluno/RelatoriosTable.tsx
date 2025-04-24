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
import {
  Categoria,
  Curso,
  RelatorioAtividade,
  StatusRelatorio,
} from "@prisma/client";
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
import { deleteAtividade, getAllActivities } from "@/lib/actions/aluno.action";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import RelatorioFormDialog from "./add/RelatorioFormDialog";

type AtividadeWithRelations = RelatorioAtividade & {
  categoria: {
    id: number;
    nome: string;
    carga_horaria: number;
  };
  feedbacks: {
    id: number;
    texto_feedback: string;
    data_envio: Date;
    professor: {
      usuario: {
        name: string | null;
      };
    };
  }[];
};

const statusColors = {
  [StatusRelatorio.AGUARDANDO_VALIDACAO]: "bg-yellow-500",
  [StatusRelatorio.VALIDO]: "bg-green-500",
  [StatusRelatorio.INVALIDO]: "bg-red-500",
  [StatusRelatorio.RECATEGORIZACAO]: "bg-blue-500",
};

const statusLabels = {
  [StatusRelatorio.AGUARDANDO_VALIDACAO]: "Aguardando Validação",
  [StatusRelatorio.VALIDO]: "Válido",
  [StatusRelatorio.INVALIDO]: "Inválido",
  [StatusRelatorio.RECATEGORIZACAO]: "Recategorização",
};

const multiColumnFilterFn: FilterFn<AtividadeWithRelations> = (
  row,
  columnId,
  filterValue
) => {
  const name = (row.original.nome || "").toLowerCase();
  const status = row.original.status || "";
  const categoria = row.original.categoria.nome || "";
  const searchableRowContent = `${name} ${status} ${categoria}`;
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const RelatoriosTable = () => {
  const id = useId();
  const queryClient = useQueryClient();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [addAtividadeDialogOpen, setAddAtividadeDialogOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "data_envio",
      desc: true,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const searchValue = useDebounce(inputValue, 300);

  const {
    data: atividadesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["atividades", pagination, sorting, searchValue],
    queryFn: async () => {
      const sortColumn = sorting.length > 0 ? sorting[0].id : "data_envio";
      const sortDirection =
        sorting.length > 0 && sorting[0].desc ? "desc" : "asc";

      const response = await getAllActivities({
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
          response.error?.message || "Falha ao buscar atividades"
        );
      }

      return {
        atividades: response.data?.atividades || [],
        totalAtividades: response.data?.total || 0,
      };
    },
  });

  const atividades = (atividadesData?.atividades as RelatorioAtividade[]) ?? [];
  const totalAtividades = atividadesData?.totalAtividades ?? 0;

  const deleteAtividadeMutation = useMutation({
    mutationFn: async (atividadeId: number) => {
      const response = (await deleteAtividade(atividadeId)) as ActionResponse;
      if (!response.success) {
        throw new Error(
          response.error?.message || "Falha ao excluir atividade"
        );
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atividades"] });
      toast.success("Atividade excluída", {
        description: "A atividade foi excluída com sucesso.",
      });
    },
    onError: (error) => {
      toast.error("Falha ao excluir atividade", {
        description: "Por favor, tente novamente.",
      });
      handleError(error);
    },
  });

  const handleDeleteAtividades = async () => {
    try {
      const selectedIds: number[] = [];
      Object.keys(rowSelection).forEach((index) => {
        const atividadeIndex = parseInt(index, 10);
        if (atividades[atividadeIndex]) {
          selectedIds.push(atividades[atividadeIndex].id);
        }
      });

      await Promise.all(
        selectedIds.map(async (id) => {
          return await deleteAtividadeMutation.mutateAsync(id);
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

  const columns = useMemo<ColumnDef<AtividadeWithRelations>[]>(
    () => [
      getSelectColumn<AtividadeWithRelations>(),
      {
        header: "Nome",
        accessorKey: "nome",
        cell: ({ row }: { row: Row<AtividadeWithRelations> }) => (
          <div className="font-medium">{row.getValue("nome") || "—"}</div>
        ),
        size: 180,
        filterFn: multiColumnFilterFn,
        enableHiding: false,
      },
      {
        header: "Categoria",
        accessorKey: "categoria.nome",
        cell: ({ row }: { row: Row<AtividadeWithRelations> }) => (
          <div>{row.original.categoria.nome || "—"}</div>
        ),
      },
      {
        header: "Data de envio",
        accessorKey: "data_envio",
        cell: ({ row }: { row: Row<AtividadeWithRelations> }) => (
          <div>
            {format(new Date(row.getValue("data_envio")), "dd/MM/yyyy", {
              locale: ptBR,
            })}
          </div>
        ),
        size: 180,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }: { row: Row<AtividadeWithRelations> }) => (
          <Badge
            className={statusColors[row.getValue("status") as StatusRelatorio]}
          >
            {statusLabels[row.getValue("status") as StatusRelatorio] || "—"}
          </Badge>
        ),
        size: 180,
      },
      {
        header: "Horas Validadas",
        accessorKey: "horas_validadas",
        cell: ({ row }: { row: Row<AtividadeWithRelations> }) => (
          <div>{row.getValue("horas_validadas") + "h" || "—"}</div>
        ),
        size: 110,
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Ações</span>,
        cell: ({ row }: { row: Row<AtividadeWithRelations> }) => (
          <RowActions row={row} />
        ),
        size: 60,
        enableHiding: false,
      },
    ],
    []
  );

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-destructive">
        <p>Erro ao carregar atividades: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TableWithToolbar<AtividadeWithRelations>
        columns={columns}
        data={atividades as AtividadeWithRelations[]}
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
              onConfirmAction={handleDeleteAtividades}
              buttonText="Excluir"
              confirmText="Excluir"
              confirmationDescription={`Esta ação não pode ser revertida. Isso excluirá permanentemente ${selectedCount} ${
                selectedCount === 1 ? "atividade" : "atividades"
              }.`}
            />
          ),
          <AddButton
            key="add-button"
            label="Adicionar atividade"
            onClick={() => setAddAtividadeDialogOpen(true)}
          />,
        ]}
        isLoading={isLoading}
        totalItems={totalAtividades}
        emptyMessage="Nenhuma atividade encontrada."
        enableSelection={true}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        pageId={id}
      />

      <Dialog
        open={addAtividadeDialogOpen}
        onOpenChange={setAddAtividadeDialogOpen}
      >
        <DialogContent>
          <RelatorioFormDialog
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["atividades"] });
              setAddAtividadeDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

function RowActions({ row }: { row: Row<AtividadeWithRelations> }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const deleteAtividadeMutation = useMutation({
    mutationFn: async () => {
      const response = (await deleteAtividade(
        row.original.id
      )) as ActionResponse;
      if (!response.success) {
        throw new Error(
          response.error?.message || "Falha ao excluir atividade"
        );
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atividades"] });
      toast.success("Atividade excluída", {
        description: "A atividade foi excluída com sucesso.",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Falha ao excluir atividade", {
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
              aria-label="Editar atividade"
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
                    permanentemente a atividade.
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteAtividadeMutation.mutate()}
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
              Atualize as informações da atividade selecionada.
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

export default RelatoriosTable;
