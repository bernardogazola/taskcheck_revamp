import CursosTable from "@/components/admin/cursos/CursosTable";
import Sidebar from "@/components/dashboard/Sidebar";

const Cursos = () => {
  return (
    <Sidebar>
      <div className="mt-4">
        <CursosTable />
      </div>
    </Sidebar>
  );
};

export default Cursos;
