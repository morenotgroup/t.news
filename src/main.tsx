import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SceneDirector } from './signage/director/SceneDirector';
import { AdminPanel } from './components/AdminPanel';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Watchdog } from './components/Watchdog';
import './styles/global.css';

function AppRouter() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('admin') === '1') {
    return <AdminPanel />;
  }

  return (
    <>
      <Watchdog />
      <SceneDirector />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </StrictMode>,
);
