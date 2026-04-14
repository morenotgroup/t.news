import { useCallback, useEffect, useRef } from 'react';
import type { Mood, StageKey } from './types';

export type SignageEvent =
  | { type: 'MOOD_OVERRIDE'; mood: Mood; until?: number }
  | { type: 'INTERRUPT_STAGE'; stage: StageKey };

export function useSignageEvents(onEvent: (event: SignageEvent) => void) {
  const handlerRef = useRef(onEvent);

  useEffect(() => {
    handlerRef.current = onEvent;
  }, [onEvent]);

  useEffect(() => {
    const listener = (event: Event) => {
      const custom = event as CustomEvent<SignageEvent>;
      handlerRef.current(custom.detail);
    };

    window.addEventListener('signage:event', listener);
    return () => window.removeEventListener('signage:event', listener);
  }, []);

  const emit = useCallback((event: SignageEvent) => {
    window.dispatchEvent(new CustomEvent('signage:event', { detail: event }));
  }, []);

  return { emit };
}
