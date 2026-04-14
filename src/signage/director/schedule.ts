import type { StageKey } from './types';

function isFriday(date: Date): boolean {
  return date.getDay() === 5;
}

function hour(date: Date): number {
  return date.getHours();
}

export function getScheduleForNow(now: Date): StageKey[] {
  const h = hour(now);

  if (h >= 7 && h <= 10) {
    return ['welcome', 'weather', 'news', 'manifesto', 'playlist'];
  }

  if (h >= 11 && h <= 14) {
    return ['welcome', 'lunch', 'agenda', 'weather', 'news'];
  }

  if (h >= 15 && h <= 16) {
    return ['news', 'agenda', 'brandReel', 'numbers', 'playlist'];
  }

  if (h >= 17 && h <= 18) {
    const base: StageKey[] = ['agenda', 'brandReel', 'numbers', 'playlist'];
    return isFriday(now) ? ['sextou', ...base] : base;
  }

  return ['welcome', 'manifesto', 'playlist', 'weather'];
}

export function inferMood(now: Date): 'calm' | 'energetic' {
  if (isFriday(now) && now.getHours() >= 17) {
    return 'energetic';
  }

  return 'calm';
}
