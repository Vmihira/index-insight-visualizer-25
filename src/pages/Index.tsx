
import IndexList from "@/components/IndexList";
import IndexChart from "@/components/IndexChart";
import Spinner from "@/components/Spinner";
import { DataProvider, useData } from "@/contexts/DataContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const Dashboard = () => {
  const { loading, error } = useData();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white py-4 px-6 border-b flex items-center justify-between">
        <h1 className="text-2xl font-bold text-financial-blue">Index Insight Visualizer</h1>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden bg-financial-blue text-white px-4 py-2 rounded"
        >
          {sidebarOpen ? "Hide" : "Show"} Indexes
        </button>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`${
            sidebarOpen ? "w-64" : "w-0"
          } transition-all duration-300 border-r bg-white overflow-hidden`}
        >
          <IndexList />
        </div>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <IndexChart />
        </main>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <DataProvider>
      <Dashboard />
    </DataProvider>
  );
};

export default Index;
