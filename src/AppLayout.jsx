import React, { useState } from 'react';
import Header from './ui/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from './ui/Sidebar';

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        <main className="flex-1 h-full min-h-0 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
