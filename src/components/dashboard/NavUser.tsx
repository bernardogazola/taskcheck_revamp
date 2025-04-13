"use client";

import {
  MoreHorizontalIcon,
  UserIcon,
  SearchIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { signOut, Session } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

const getInitials = (name: string): string => {
  if (!name) return "";

  const nameArray = name.split(" ");

  if (nameArray.length === 1) {
    return nameArray[0].charAt(0).toUpperCase();
  }

  return (nameArray[0].charAt(0) + nameArray[1].charAt(0)).toUpperCase();
};

export function NavUser({ user }: { user: Session["user"] | undefined }) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="in-data-[state=expanded]:size-6 transition-[width,height] duration-200 ease-in-out">
                <AvatarFallback>{getInitials(user?.name || "")}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight ms-1">
                <span className="truncate font-medium">{user?.name}</span>
              </div>
              <div className="size-8 rounded-lg flex items-center justify-center bg-sidebar-accent/50 in-[[data-slot=dropdown-menu-trigger]:hover]:bg-transparent">
                <MoreHorizontalIcon className="size-5 opacity-40" size={20} />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem className="gap-3 px-1">
              <UserIcon
                size={20}
                className="text-muted-foreground/70"
                aria-hidden="true"
              />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 px-1">
              <SearchIcon
                size={20}
                className="text-muted-foreground/70"
                aria-hidden="true"
              />
              <span>Histórico</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 px-1">
              <SettingsIcon
                size={20}
                className="text-muted-foreground/70"
                aria-hidden="true"
              />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-3 px-1"
              onClick={() =>
                signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push(ROUTES.SIGN_IN);
                    },
                  },
                })
              }
            >
              <LogOutIcon
                size={20}
                className="text-muted-foreground/70"
                aria-hidden="true"
              />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
