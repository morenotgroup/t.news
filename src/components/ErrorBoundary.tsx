import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Fatal signage error', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ width: '100vw', height: '100vh', display: 'grid', placeItems: 'center', background: '#020409', color: '#e8efff' }}>
          <div>
            <h1>Reinicie o player</h1>
            <p>Falha inesperada no Living Wall.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
