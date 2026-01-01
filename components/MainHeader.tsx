
import React from 'react';
import { MenuIcon, SearchIcon, GridIcon, BellIcon, UserIcon } from './icons';
import { User } from '../types';

interface MainHeaderProps {
  user: User;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ user, setSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm flex-shrink-0">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-500 hover:text-slate-600 lg:hidden mr-4"
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="hidden sm:block">
                <span className="font-semibold text-slate-500">Role:</span>
                <span className="ml-2 font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">{user.role}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800">
              <SearchIcon className="h-6 w-6" />
            </button>
            <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800">
              <GridIcon className="h-6 w-6" />
            </button>
            <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 relative">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-1 right-1 flex h-4 w-4">
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 items-center justify-center text-white text-xs font-medium">2</span>
              </span>
            </button>
            <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
            <button className="relative">
              <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                <UserIcon className="h-6 w-6" />
              </div>
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};