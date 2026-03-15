export type NoteColor = 'default' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'purple' | 'pink' | 'brown' | 'gray';

export interface Note {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  isPinned: boolean;
  createdAt: number;
  updatedAt: number;
  labels: string[];
}
