import {
  LayoutDashboard,
  Send,
  Users,
  GraduationCap,
  BookCheck,
  BookOpen,
} from "lucide-react";
import ROUTES from "@/constants/routes";
const APP_SIDEBAR = {
  navMain: [
    {
      title: "Geral",
      items: [
        {
          title: "Dashboard",
          url: ROUTES.DASHBOARD,
          icon: LayoutDashboard,
          roles: ["aluno", "professor", "coordenador", "admin"],
        },
        {
          title: "Atividades",
          url: ROUTES.DASHBOARD_ALUNO.ATIVIDADES,
          icon: BookCheck,
          roles: ["aluno"],
        },
        {
          title: "Usuários",
          url: ROUTES.DASHBOARD_ADMIN.USERS,
          icon: Users,
          roles: ["admin"],
        },
        {
          title: "Cursos",
          url: ROUTES.DASHBOARD_ADMIN.CURSOS,
          icon: GraduationCap,
          roles: ["admin"],
        },
        {
          title: "Categorias",
          url: ROUTES.DASHBOARD_COORDENADOR.CATEGORIAS,
          icon: BookOpen,
          roles: ["coordenador"],
        },
      ],
    },
  ],
};

export default APP_SIDEBAR;
