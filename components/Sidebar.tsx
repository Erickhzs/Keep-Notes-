'use client';

import { Lightbulb, Bell, Archive, Trash2, Edit2 } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ isOpen, activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    { id: 'notes', icon: Lightbulb, label: 'Notes' },
    { id: 'reminders', icon: Bell, label: 'Reminders' },
    { id: 'edit-labels', icon: Edit2, label: 'Edit labels' },
    { id: 'archive', icon: Archive, label: 'Archive' },
    { id: 'trash', icon: Trash2, label: 'Trash' },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-zinc-900 transition-all duration-300 z-10 overflow-y-auto ${
        isOpen ? 'w-64 shadow-lg sm:shadow-none' : 'w-0 sm:w-16'
      } overflow-hidden`}
    >
      <nav className="py-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-6 px-4 sm:px-5 py-3 rounded-r-full transition-colors ${
                isActive
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <Icon className={`w-6 h-6 shrink-0 ${isActive ? 'fill-current opacity-20' : ''}`} />
              <span className={`font-medium whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 sm:opacity-0'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
