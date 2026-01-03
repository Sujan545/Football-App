import { Outlet, useLocation } from "react-router-dom";
import BackButton from "../shared/BackButton";

const DashboardLayout = () => {
  const location = useLocation();

  
  const showBackButton = location.pathname !== "/";

  return (
    <div className="flex min-h-screen bg-gray-100">
    

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white shadow px-6 py-4">
          {showBackButton && <BackButton />}
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
