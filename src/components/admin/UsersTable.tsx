"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  type PaginationState,
  type Row,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleAlertIcon, EllipsisIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { toast } from "sonner";
import { type User } from "@/lib/auth-client";
import handleError from "@/lib/handlers/error";
import { removeUser, changeUserRole } from "@/lib/actions/admin.action";
import BanUserDialog from "@/components/admin/ban/BanUserDialog";
import AddUserDialog from "@/components/admin/add/AddUserDialog";

// Import the shared data table components
import { getSelectColumn } from "@/components/shared/data-table/SelectableColumn";
import { CheckboxFilter } from "@/components/shared/data-table/CommonFilters";
import { BulkActionButton } from "@/components/shared/data-table/BulkActionButton";
import { AddButton } from "@/components/shared/data-table/AddButton";
import { TableWithToolbar } from "@/components/shared/data-table/TableWithToolbar";
import { useDebounce } from "@uidotdev/usehooks";

// Define our table user type based on what is returned from better-auth
interface TableUser extends User {
  status?: string; // Virtual property for filtering
}

// Custom filter function for multi-column searching - ensure case insensitivity
const multiColumnFilterFn: FilterFn<TableUser> = (
  row,
  columnId,
  filterValue
) => {
  const name = (row.original.name || "").toLowerCase();
  const email = (row.original.email || "").toLowerCase();
  const searchableRowContent = `${name} ${email}`;
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const statusFilterFn: FilterFn<TableUser> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;

  const isBanned = row.original.banned === true;
  const userStatus = isBanned ? "Banido" : "Ativo";

  return filterValue.includes(userStatus);
};

export default function UsersTable() {
  const id = useId();
  const queryClient = useQueryClient();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const searchValue = useDebounce(inputValue, 300);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);

  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", pagination, sorting, searchValue, roleFilter],
    queryFn: async () => {
      const sortColumn = sorting.length > 0 ? sorting[0].id : "name";
      const sortDirection =
        sorting.length > 0 && sorting[0].desc ? "desc" : "asc";

      const query: Record<string, any> = {
        limit: pagination.pageSize,
        offset: pagination.pageIndex * pagination.pageSize,
        sortBy: sortColumn,
        sortDirection: sortDirection,
      };

      // Add search if present
      if (searchValue) {
        query.searchField = "name";
        query.searchOperator = "contains";
        query.searchValue = searchValue.toLowerCase();
      }

      // Add role filter if present
      if (roleFilter.length > 0) {
        query.filterField = "role";
        query.filterOperator = "eq";
        query.filterValue = roleFilter[0];
      }

      const response = await authClient.admin.listUsers({ query });

      if ("data" in response && response.data) {
        return {
          users: response.data.users || [],
          totalUsers: response.data.total || 0,
        };
      } else {
        throw new Error("Falha ao buscar usuários");
      }
    },
  });

  const users = (usersData?.users as TableUser[]) ?? [];
  const totalUsers = usersData?.totalUsers ?? 0;

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = (await removeUser(userId)) as ActionResponse;
      if (!response.success) {
        throw new Error(response.error?.message || "Falha ao excluir usuário");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuário excluído", {
        description: "O usuário foi excluído com sucesso.",
      });
    },
    onError: (error) => {
      toast.error("Falha ao excluir usuário", {
        description: "Por favor, tente novamente.",
      });
      handleError(error);
    },
  });

  const handleDeleteUsers = async () => {
    try {
      const selectedIds: string[] = [];
      Object.keys(rowSelection).forEach((index) => {
        const userIndex = parseInt(index, 10);
        if (users[userIndex]) {
          selectedIds.push(users[userIndex].id);
        }
      });

      await Promise.all(
        selectedIds.map(async (id) => {
          return await deleteUserMutation.mutateAsync(id);
        })
      );

      setRowSelection({});
    } catch (error) {
      handleError(error);
    }
  };

  const uniqueRoles = useMemo(() => {
    return Array.from(
      new Set(users.map((user) => user.role).filter(Boolean))
    ).sort() as string[];
  }, [users]);

  const roleFilterOptions = useMemo(() => {
    return uniqueRoles.map((role) => ({
      value: role,
      label: role,
      count: users.filter((user) => user.role === role).length,
    }));
  }, [uniqueRoles, users]);

  const handleRoleChange = (checked: boolean, value: string) => {
    let newRoleFilter = [...roleFilter];

    if (checked) {
      newRoleFilter.push(value);
    } else {
      newRoleFilter = newRoleFilter.filter((role) => role !== value);
    }

    setRoleFilter(newRoleFilter);
    setPagination({ ...pagination, pageIndex: 0 });
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [searchValue]);

  const selectedCount = Object.keys(rowSelection).length;

  const columns = useMemo<ColumnDef<TableUser>[]>(
    () => [
      getSelectColumn<TableUser>(),
      {
        header: "Nome",
        accessorKey: "name",
        cell: ({ row }: { row: Row<TableUser> }) => (
          <div className="font-medium">{row.getValue("name") || "—"}</div>
        ),
        size: 180,
        filterFn: multiColumnFilterFn,
        enableHiding: false,
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: ({ row }: { row: Row<TableUser> }) => (
          <div>{row.getValue("email") || "—"}</div>
        ),
        size: 220,
      },
      {
        header: "Cargo",
        accessorKey: "role",
        cell: ({ row }: { row: Row<TableUser> }) => (
          <div>{row.getValue("role") || "—"}</div>
        ),
        size: 120,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }: { row: Row<TableUser> }) => (
          <Badge variant={row.original.banned ? "destructive" : "outline"}>
            {row.original.banned ? "Banido" : "Ativo"}
          </Badge>
        ),
        size: 100,
        filterFn: statusFilterFn,
        enableSorting: false,
      },
      {
        header: "Criado em",
        accessorKey: "createdAt",
        cell: ({ row }: { row: Row<TableUser> }) => {
          const date = new Date(row.getValue("createdAt"));
          return date.toLocaleDateString();
        },
        size: 120,
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Ações</span>,
        cell: ({ row }: { row: Row<TableUser> }) => <RowActions row={row} />,
        size: 60,
        enableHiding: false,
      },
    ],
    []
  );

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-destructive">
        <p>Erro ao carregar usuários: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TableWithToolbar
        columns={columns}
        data={users}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        searchValue={inputValue}
        onSearchChange={handleInputChange}
        searchPlaceholder="Filtrar por nome ou email..."
        filterElements={[
          <CheckboxFilter
            key="role-filter"
            id={`${id}-role-filter`}
            label="Cargo"
            options={roleFilterOptions}
            selectedValues={roleFilter}
            onChange={handleRoleChange}
          />,
        ]}
        actionElements={[
          selectedCount > 0 && (
            <BulkActionButton
              key="delete-button"
              selectedCount={selectedCount}
              onConfirmAction={handleDeleteUsers}
              buttonText="Excluir"
              confirmText="Excluir"
              confirmationDescription={`Esta ação não pode ser revertida. Isso excluirá permanentemente ${selectedCount} ${
                selectedCount === 1 ? "usuário" : "usuários"
              }.`}
            />
          ),
          <AddButton
            key="add-button"
            label="Adicionar usuário"
            onClick={() => setAddUserDialogOpen(true)}
          />,
        ]}
        isLoading={isLoading}
        totalItems={totalUsers}
        emptyMessage="Nenhum usuário encontrado."
        enableSelection={true}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        pageId={id}
      />

      <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
        <DialogContent>
          <AddUserDialog
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["users"] });
              setAddUserDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RowActions({ row }: { row: Row<TableUser> }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [banDialogOpen, setBanDialogOpen] = useState(false);

  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      const response = (await removeUser(row.original.id)) as ActionResponse;
      if (!response.success) {
        throw new Error(response.error?.message || "Falha ao excluir usuário");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuário excluído", {
        description: "O usuário foi excluído com sucesso.",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Falha ao excluir usuário", {
        description: "Por favor, tente novamente.",
      });
      handleError(error);
    },
  });

  const changeRoleMutation = useMutation({
    mutationFn: async (newRole: string) => {
      const response = (await changeUserRole(
        row.original.id,
        newRole
      )) as ActionResponse;
      if (!response.success) {
        throw new Error(
          response.error?.message || "Falha ao alterar cargo do usuário"
        );
      }
      return response;
    },
    onSuccess: (_, newRole) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Cargo alterado", {
        description: `O cargo do usuário foi alterado para ${newRole}.`,
      });
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Falha ao alterar cargo", {
        description: "Por favor, tente novamente.",
      });
      handleError(error);
    },
  });

  const handleRoleChange = (newRole: string) => {
    changeRoleMutation.mutate(newRole);
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none"
              aria-label="Editar usuário"
            >
              <EllipsisIcon size={16} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Editar</span>
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Redefinir senha</span>
              <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {row.original.banned ? (
              <DropdownMenuItem>
                <span>Desbanir</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  setBanDialogOpen(true);
                }}
              >
                <span>Banir</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Alterar cargo</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onSelect={() => handleRoleChange("admin")}>
                    admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleRoleChange("aluno")}>
                    aluno
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleRoleChange("professor")}
                  >
                    professor
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleRoleChange("coordenador")}
                  >
                    coordenador
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
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
                  <CircleAlertIcon className="opacity-80" size={16} />
                </div>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser revertida. Isso excluirá
                    permanentemente o usuário.
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteUserMutation.mutate()}>
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent>
          <BanUserDialog
            userId={row.original.id}
            username={row.original.name || row.original.email || "Usuário"}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["users"] });
              setBanDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
