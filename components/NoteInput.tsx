'use client';

import { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, CheckSquare, PaintBucket, Pin, Archive, MoreVertical, Undo, Redo } from 'lucide-react';
import { Note, NoteColor } from '@/lib/types';
import { COLOR_MAP } from '@/lib/constants';
import { ColorPicker } from './ColorPicker';

interface NoteInputProps {
  onAddNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function NoteInput({ onAddNote }: NoteInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<NoteColor>('default');
  const [isPinned, setIsPinned] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleAddNote = () => {
    if (title.trim() || content.trim()) {
      onAddNote({
        title: title.trim(),
        content: content.trim(),
        color,
        isPinned,
        labels: [],
      });
      setTitle('');
      setContent('');
      setColor('default');
      setIsPinned(false);
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (title.trim() || content.trim()) {
          handleAddNote();
        } else {
          setIsExpanded(false);
          setColor('default');
          setIsPinned(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content, color, isPinned]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    // Auto-resize textarea
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  };

  const colorClasses = COLOR_MAP[color];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-8">
      <div
        ref={containerRef}
        className={`relative rounded-lg shadow-md border transition-all duration-200 ${colorClasses.bg} ${colorClasses.border}`}
      >
        {isExpanded ? (
          <div className="flex flex-col p-4">
            <div className="flex items-start justify-between">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-lg font-medium outline-none placeholder-zinc-500 dark:placeholder-zinc-400 text-zinc-800 dark:text-zinc-100 mb-2"
              />
              <button
                onClick={() => setIsPinned(!isPinned)}
                className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
                  isPinned ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                <Pin className={`w-5 h-5 ${isPinned ? 'fill-current' : ''}`} />
              </button>
            </div>
            <textarea
              ref={contentRef}
              placeholder="Take a note..."
              value={content}
              onChange={handleContentChange}
              className="w-full bg-transparent outline-none resize-none overflow-hidden min-h-[40px] text-zinc-700 dark:text-zinc-300 placeholder-zinc-500 dark:placeholder-zinc-400"
              rows={1}
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 relative">
                <button 
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <PaintBucket className="w-4 h-4" />
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
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                  <Archive className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                  <Undo className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                  <Redo className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsExpanded(true)}
            className="flex items-center justify-between p-3 cursor-text"
          >
            <span className="text-zinc-500 dark:text-zinc-400 font-medium px-2">Take a note...</span>
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <CheckSquare className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <PaintBucket className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
