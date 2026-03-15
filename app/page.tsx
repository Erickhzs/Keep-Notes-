'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { NoteInput } from '@/components/NoteInput';
import { NoteCard } from '@/components/NoteCard';
import { NoteModal } from '@/components/NoteModal';
import { Note } from '@/lib/types';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('notes');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const savedNotes = localStorage.getItem('keep-notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to parse notes from local storage', e);
      }
    } else {
      // Add some initial dummy notes
      const initialNotes: Note[] = [
        {
          id: '1',
          title: 'Welcome to Keep Clone!',
          content: 'This is a simple note-taking app inspired by Google Keep.\n\nFeatures:\n- Create, edit, and delete notes\n- Pin important notes\n- Change note colors\n- Search functionality\n- Grid and List views\n- Responsive design\n- Dark mode support',
          color: 'yellow',
          isPinned: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          labels: [],
        },
        {
          id: '2',
          title: 'Grocery List',
          content: '• Milk\n• Eggs\n• Bread\n• Bananas\n• Coffee',
          color: 'green',
          isPinned: false,
          createdAt: Date.now() - 10000,
          updatedAt: Date.now() - 10000,
          labels: [],
        },
        {
          id: '3',
          title: 'Project Ideas',
          content: '1. A habit tracker app\n2. A personal finance dashboard\n3. A markdown editor with live preview',
          color: 'blue',
          isPinned: false,
          createdAt: Date.now() - 20000,
          updatedAt: Date.now() - 20000,
          labels: [],
        }
      ];
      setNotes(initialNotes);
      localStorage.setItem('keep-notes', JSON.stringify(initialNotes));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('keep-notes', JSON.stringify(notes));
    }
  }, [notes, isMounted]);

  const handleAddNote = (newNoteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...newNoteData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note
    ));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const otherNotes = filteredNotes.filter(note => !note.isPinned);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-sans">
      <Header 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isGridView={isGridView}
        onToggleView={() => setIsGridView(!isGridView)}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <main className={`flex-1 transition-all duration-300 p-4 sm:p-8 ${isSidebarOpen ? 'ml-0 sm:ml-64' : 'ml-0 sm:ml-16'}`}>
          <NoteInput onAddNote={handleAddNote} />
          
          {pinnedNotes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4 ml-2">Pinned</h2>
              <div className={isGridView ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4" : "flex flex-col max-w-3xl mx-auto"}>
                {pinnedNotes.map(note => (
                  <NoteCard 
                    key={note.id} 
                    note={note} 
                    onClick={setSelectedNote}
                    onUpdate={handleUpdateNote}
                    onDelete={handleDeleteNote}
                  />
                ))}
              </div>
            </div>
          )}

          {otherNotes.length > 0 && (
            <div>
              {pinnedNotes.length > 0 && (
                <h2 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4 ml-2">Others</h2>
              )}
              <div className={isGridView ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4" : "flex flex-col max-w-3xl mx-auto"}>
                {otherNotes.map(note => (
                  <NoteCard 
                    key={note.id} 
                    note={note} 
                    onClick={setSelectedNote}
                    onUpdate={handleUpdateNote}
                    onDelete={handleDeleteNote}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredNotes.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-20 text-zinc-400 dark:text-zinc-600">
              <LightbulbIcon className="w-24 h-24 mb-4 opacity-20" />
              <p className="text-xl font-medium">Notes you add appear here</p>
            </div>
          )}
        </main>
      </div>

      {selectedNote && (
        <NoteModal 
          note={selectedNote} 
          onClose={() => setSelectedNote(null)} 
          onUpdate={handleUpdateNote}
          onDelete={handleDeleteNote}
        />
      )}
    </div>
  );
}

function LightbulbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}
