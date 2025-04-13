import { CompassIcon, Send, LayoutDashboard } from "lucide-react";
import { Role } from "@prisma/client";

const APP_SIDEBAR = {
  navMain: [
    {
      title: "Geral",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
          roles: [Role.ALUNO, Role.COORDENADOR, Role.PROFESSOR] as Role[],
        },
        {
          title: "Enviar Atividades",
          url: "/dashboard/enviar-atividade",
          icon: Send,
          roles: [Role.ALUNO] as Role[],
        },
        {
          title: "Sei lá",
          url: "#",
          icon: CompassIcon,
          roles: [Role.PROFESSOR] as Role[],
        },
      ],
    },
  ],
};

export default APP_SIDEBAR;
