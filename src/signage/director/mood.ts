import { createContext, useContext } from 'react';
import { create } from 'zustand';
import type { Mood } from './types';

interface MoodState {
  mood: Mood;
  setMood: (mood: Mood) => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  mood: 'calm',
  setMood: (mood) => set({ mood }),
}));

export const MoodContext = createContext<Mood>('calm');

export function useMood(): Mood {
  return useContext(MoodContext);
}
