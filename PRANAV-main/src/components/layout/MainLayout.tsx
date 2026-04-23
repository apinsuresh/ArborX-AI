import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto w-full p-8 md:p-12 bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
