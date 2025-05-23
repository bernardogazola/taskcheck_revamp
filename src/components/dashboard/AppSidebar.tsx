"use client";

import Link from "next/link";
import Image from "next/image";
import { NavUser } from "@/components/dashboard/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useSession, getSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import APP_SIDEBAR from "@/constants/appSidebar";
import { useQuery } from "@tanstack/react-query";

interface AppSidebarProps {
  title?: string;
  items?: {
    title: string;
    url: string;
    icon: React.ComponentType<any>;
    roles: string[];
  }[];
}

function SidebarLogo() {
  return (
    <div className="flex gap-2 px-2 group-data-[collapsible=icon]:px-0 transition-[padding] duration-200 ease-in-out">
      <Link className="group/logo inline-flex items-center gap-2" href="/">
        <span className="sr-only">Logo</span>
        <Image
          src="/pucpr.svg"
          alt="Logo"
          width={36}
          height={36}
          className="size-10 group-data-[collapsible=icon]:size-9 transition-[width,height] duration-200 ease-in-out"
        />
        <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden transition-opacity duration-200 ease-in-out">
          Taskcheck
        </span>
      </Link>
    </div>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role;
  const pathname = usePathname();
  const items = APP_SIDEBAR.navMain;
  console.log(role);
  console.log(session);

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader className="h-16 max-md:mt-2 mb-2 justify-center">
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent className="-mt-2">
        {items.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/65">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items
                  ?.filter(
                    (menuItem) =>
                      !menuItem.roles.length ||
                      (role && menuItem.roles.includes(role))
                  )
                  .map((menuItem) => (
                    <SidebarMenuItem key={menuItem.title}>
                      <SidebarMenuButton
                        asChild
                        className="group/menu-button group-data-[collapsible=icon]:px-[5px]! font-medium gap-3 h-9 [&>svg]:size-auto"
                        tooltip={menuItem.title}
                        isActive={pathname === menuItem.url}
                      >
                        <Link href={menuItem.url}>
                          {menuItem.icon && (
                            <menuItem.icon
                              className="text-muted-foreground/65 group-data-[active=true]/menu-button:text-primary"
                              size={22}
                              aria-hidden="true"
                            />
                          )}
                          <span>{menuItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
