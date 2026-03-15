'use client';

import { Menu, Search, Settings, RefreshCcw, Grid, List } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isGridView: boolean;
  onToggleView: () => void;
}

export function Header({ onMenuClick, searchQuery, onSearchChange, isGridView, onToggleView }: HeaderProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-20 h-16">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg leading-none">K</span>
          </div>
          <span className="text-xl font-medium text-zinc-700 dark:text-zinc-200 hidden sm:block">Keep Clone</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl px-4">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isFocused
              ? 'bg-white dark:bg-zinc-800 shadow-md border border-transparent dark:border-zinc-700'
              : 'bg-zinc-100 dark:bg-zinc-800/50 border border-transparent'
          }`}
        >
          <Search className="w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent border-none outline-none text-zinc-700 dark:text-zinc-200 placeholder-zinc-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors hidden sm:block">
          <RefreshCcw className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
        </button>
        <button
          onClick={onToggleView}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle View"
        >
          {isGridView ? (
            <List className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          ) : (
            <Grid className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          )}
        </button>
        <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors hidden sm:block">
          <Settings className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium ml-2">
          U
        </div>
      </div>
    </header>
  );
}
