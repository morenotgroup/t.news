import { useEffect } from 'react';

const HEARTBEAT_KEY = 'tnews-last-heartbeat';

export function Watchdog() {
  useEffect(() => {
    const id = window.setInterval(() => {
      localStorage.setItem(HEARTBEAT_KEY, new Date().toISOString());
    }, 10_000);

    return () => window.clearInterval(id);
  }, []);

  return null;
}
