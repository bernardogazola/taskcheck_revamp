import Sidebar from "@/components/dashboard/Sidebar";
import UsersTable from "@/components/admin/UsersTable";

const Users = () => {
  return (
    <Sidebar>
      <div className="mt-4">
        <UsersTable />
      </div>
    </Sidebar>
  );
};

export default Users;
