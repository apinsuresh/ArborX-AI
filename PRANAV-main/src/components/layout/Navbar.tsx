import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
  title?: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/10">
      <div className="flex items-center gap-12">
        <h2 className="font-display font-extrabold text-2xl text-on-surface whitespace-nowrap tracking-tight">
          {title || "ArborX AI"}
        </h2>
        
        <nav className="flex items-center gap-8">
          {['Home', 'Analysis History'].map((item) => (
            <NavLink 
              key={item} 
              to={item === 'Home' ? '/dashboard' : 
                   item === 'Analysis History' ? '/history' : '#'} 
              className={({ isActive }) => cn(
                "text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-all border-b-2 py-2 -mb-[10px]",
                isActive ? "text-primary border-primary" : "border-transparent"
              )}
            >
              {item}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search methodology..." 
            className="pl-12 pr-6 py-3 bg-surface-container-low rounded-xl text-sm w-96 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium border border-outline-variant/5 shadow-inner"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-3 hover:bg-surface-container-high rounded-xl text-on-surface-variant transition-colors group">
            <Bell className="w-5 h-5 group-hover:fill-primary/20" />
          </button>
          <NavLink to="/settings" className="p-3 hover:bg-surface-container-high rounded-xl text-on-surface-variant transition-colors group">
            <Settings className="w-5 h-5" />
          </NavLink>
        </div>

        <div className="ml-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-xl hover:scale-105 transition-transform cursor-pointer">
            <img 
              src="https://picsum.photos/seed/marcus/100/100" 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
