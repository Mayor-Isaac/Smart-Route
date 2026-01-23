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
    <div className="flex h-screen flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex min-h-0 flex-1">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        <main className="h-full min-h-0 flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-green-600 [&::-webkit-scrollbar-thumb]:hover:bg-green-700 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
