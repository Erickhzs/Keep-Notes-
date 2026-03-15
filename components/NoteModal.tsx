'use client';

import { useState, useEffect, useRef } from 'react';
import { Note, NoteColor } from '@/lib/types';
import { COLOR_MAP } from '@/lib/constants';
import { Pin, PaintBucket, Archive, MoreVertical, Trash2, X } from 'lucide-react';
import { ColorPicker } from './ColorPicker';

interface NoteModalProps {
  note: Note | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onDelete: (id: string) => void;
}

export function NoteModal({ note, onClose, onUpdate, onDelete }: NoteModalProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [color, setColor] = useState<NoteColor>(note?.color || 'default');
  const [isPinned, setIsPinned] = useState(note?.isPinned || false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [content]);

  if (!note) return null;

  const handleClose = () => {
    if (title !== note.title || content !== note.content || color !== note.color || isPinned !== note.isPinned) {
      onUpdate(note.id, { title, content, color, isPinned });
    }
    onClose();
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  };

  const colorClasses = COLOR_MAP[color];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl transition-all duration-300 ${colorClasses.bg} ${colorClasses.border} border`}
      >
        <div className="flex flex-col p-6">
          <div className="flex items-start justify-between mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-2xl font-medium outline-none placeholder-zinc-500 dark:placeholder-zinc-400 text-zinc-900 dark:text-zinc-100"
            />
            <button
              onClick={() => setIsPinned(!isPinned)}
              className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ml-4 ${
                isPinned ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <Pin className={`w-6 h-6 ${isPinned ? 'fill-current' : ''}`} />
            </button>
          </div>
          <textarea
            ref={contentRef}
            placeholder="Take a note..."
            value={content}
            onChange={handleContentChange}
            className="w-full bg-transparent outline-none resize-none overflow-hidden min-h-[100px] text-zinc-800 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 text-lg"
          />
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 relative">
              <button 
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <PaintBucket className="w-5 h-5" />
              </button>
              {showColorPicker && (
                <ColorPicker 
                  selectedColor={color} 
                  onSelectColor={(c) => {
                    setColor(c);
                    setShowColorPicker(false);
                  }} 
                />
              )}
              <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <Archive className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  onDelete(note.id);
                  onClose();
                }}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
