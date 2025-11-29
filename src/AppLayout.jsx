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
    <div className="h-screen border  border-green-500 overflow-y-scroll bg-black">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex-1 border border-yellow-500 flex items-stretch">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        <main className="flex-1 p-4 overflow-y-auto h-full border  border-blue-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
