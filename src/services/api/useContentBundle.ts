import { useCallback, useEffect, useState } from 'react';
import { fetchBundle } from './providers';
import { getMockBundle } from '../contentAdapters/mockAdapters';
import type { ContentBundle } from '../contentAdapters/schemas';

const REFRESH_MS = 120_000;

export function useContentBundle() {
  const [bundle, setBundle] = useState<ContentBundle>(getMockBundle());
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [isStale, setIsStale] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const next = await fetchBundle();
      setBundle(next);
      setLastSync(new Date());
      setIsStale(false);
    } catch {
      setIsStale(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const id = window.setInterval(() => {
      void refresh();
    }, REFRESH_MS);

    return () => window.clearInterval(id);
  }, [refresh]);

  return { bundle, lastSync, isStale, refresh };
}
