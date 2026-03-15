'use client';

import { Note, NoteColor } from '@/lib/types';
import { COLOR_MAP } from '@/lib/constants';
import { Pin, PaintBucket, Archive, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ColorPicker } from './ColorPicker';

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onClick, onUpdate, onDelete }: NoteCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorClasses = COLOR_MAP[note.color];

  return (
    <div
      className={`group relative rounded-lg border p-4 transition-all duration-200 cursor-pointer break-inside-avoid mb-4 ${colorClasses.bg} ${colorClasses.border} ${colorClasses.hover}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(note)}
    >
      <div className="flex justify-between items-start mb-2">
        {note.title && (
          <h3 className="font-medium text-zinc-800 dark:text-zinc-100 text-lg leading-tight pr-8">
            {note.title}
          </h3>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate(note.id, { isPinned: !note.isPinned });
          }}
          className={`absolute top-3 right-3 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-opacity ${
            note.isPinned || isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Pin
            className={`w-4 h-4 ${
              note.isPinned
                ? 'fill-current text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          />
        </button>
      </div>

      {note.content && (
        <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap text-sm line-clamp-10">
          {note.content}
        </p>
      )}

      <div
        className={`flex items-center gap-1 mt-4 text-zinc-500 dark:text-zinc-400 transition-opacity relative ${
          isHovered || showColorPicker ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <PaintBucket className="w-4 h-4" />
        </button>
        {showColorPicker && (
          <ColorPicker 
            selectedColor={note.color} 
            onSelectColor={(c) => {
              onUpdate(note.id, { color: c });
              setShowColorPicker(false);
            }} 
          />
        )}
        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <Archive className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-red-500 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
