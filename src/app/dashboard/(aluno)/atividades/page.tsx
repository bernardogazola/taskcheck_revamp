import Sidebar from "@/components/dashboard/Sidebar";
import RelatoriosTable from "@/components/aluno/RelatoriosTable";
const Atividades = () => {
  return (
    <Sidebar>
      <div className="mt-4">
        <RelatoriosTable />
      </div>
    </Sidebar>
  );
};

export default Atividades;
