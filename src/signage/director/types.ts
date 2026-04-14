import type { ReactNode } from 'react';
import type { ContentBundle } from '../../services/contentAdapters/schemas';

export type Mood = 'calm' | 'energetic' | 'cozy' | 'celebration' | 'formal';

export type StageKey =
  | 'welcome'
  | 'weather'
  | 'news'
  | 'agenda'
  | 'lunch'
  | 'birthday'
  | 'brandReel'
  | 'manifesto'
  | 'numbers'
  | 'playlist'
  | 'sextou';

export interface StageContext {
  now: Date;
  mood: Mood;
  content: ContentBundle;
  isStale: boolean;
  lastSync: Date;
}

export interface StageDefinition {
  key: StageKey;
  durationMs: number;
  render: (ctx: StageContext) => ReactNode;
}
