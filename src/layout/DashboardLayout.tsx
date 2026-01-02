import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BackButton from "../shared/BackButton";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white shadow px-6 py-4">
          <BackButton />
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
