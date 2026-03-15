import { NoteColor } from './types';

export const COLOR_MAP: Record<NoteColor, { bg: string; border: string; hover: string }> = {
  default: { bg: 'bg-white dark:bg-zinc-900', border: 'border-zinc-200 dark:border-zinc-700', hover: 'hover:shadow-md' },
  red: { bg: 'bg-red-100 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-900/50', hover: 'hover:shadow-md hover:shadow-red-500/10' },
  orange: { bg: 'bg-orange-100 dark:bg-orange-950/30', border: 'border-orange-200 dark:border-orange-900/50', hover: 'hover:shadow-md hover:shadow-orange-500/10' },
  yellow: { bg: 'bg-yellow-100 dark:bg-yellow-950/30', border: 'border-yellow-200 dark:border-yellow-900/50', hover: 'hover:shadow-md hover:shadow-yellow-500/10' },
  green: { bg: 'bg-green-100 dark:bg-green-950/30', border: 'border-green-200 dark:border-green-900/50', hover: 'hover:shadow-md hover:shadow-green-500/10' },
  teal: { bg: 'bg-teal-100 dark:bg-teal-950/30', border: 'border-teal-200 dark:border-teal-900/50', hover: 'hover:shadow-md hover:shadow-teal-500/10' },
  blue: { bg: 'bg-blue-100 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-900/50', hover: 'hover:shadow-md hover:shadow-blue-500/10' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-950/30', border: 'border-purple-200 dark:border-purple-900/50', hover: 'hover:shadow-md hover:shadow-purple-500/10' },
  pink: { bg: 'bg-pink-100 dark:bg-pink-950/30', border: 'border-pink-200 dark:border-pink-900/50', hover: 'hover:shadow-md hover:shadow-pink-500/10' },
  brown: { bg: 'bg-orange-200 dark:bg-orange-900/30', border: 'border-orange-300 dark:border-orange-800/50', hover: 'hover:shadow-md hover:shadow-orange-500/10' },
  gray: { bg: 'bg-gray-100 dark:bg-gray-800/50', border: 'border-gray-200 dark:border-gray-700', hover: 'hover:shadow-md hover:shadow-gray-500/10' },
};
