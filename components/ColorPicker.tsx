'use client';

import { NoteColor } from '@/lib/types';
import { COLOR_MAP } from '@/lib/constants';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  selectedColor: NoteColor;
  onSelectColor: (color: NoteColor) => void;
}

export function ColorPicker({ selectedColor, onSelectColor }: ColorPickerProps) {
  const colors: NoteColor[] = [
    'default', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink', 'brown', 'gray'
  ];

  return (
    <div className="absolute bottom-full left-0 mb-2 p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 flex flex-wrap gap-2 w-[280px] z-50">
      {colors.map((color) => {
        const colorClasses = COLOR_MAP[color];
        return (
          <button
            key={color}
            onClick={(e) => {
              e.stopPropagation();
              onSelectColor(color);
            }}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 ${colorClasses.bg} ${
              selectedColor === color ? 'border-blue-500 dark:border-blue-400' : 'border-transparent'
            }`}
            title={color}
          >
            {selectedColor === color && <Check className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />}
          </button>
        );
      })}
    </div>
  );
}
