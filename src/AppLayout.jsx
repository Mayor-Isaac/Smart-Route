import React from 'react';
import Header from './ui/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from './ui/Sidebar';

export default function AppLayout() {

  return (
    <div className="h-screen border">
      <Header />
      <div className="flex items-stretch">
        <Sidebar />
        <main className="flex-1 p-4 overflow-y-auto border">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
