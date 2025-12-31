import Sidebar from "../components/Sidebar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
     <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
