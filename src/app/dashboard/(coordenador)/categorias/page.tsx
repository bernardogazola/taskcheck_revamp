import Sidebar from "@/components/dashboard/Sidebar";
import CategoriasTable from "@/components/coordenador/CategoriasTable";

const Categorias = () => {
  return (
    <Sidebar>
      <div className="mt-4">
        <CategoriasTable />
      </div>
    </Sidebar>
  );
};

export default Categorias;
