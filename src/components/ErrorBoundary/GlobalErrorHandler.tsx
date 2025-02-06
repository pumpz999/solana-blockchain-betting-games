import React, { ErrorInfo } from 'react';
import * as Sentry from "@sentry/react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class GlobalErrorHandler extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    Sentry.captureException(error, { extra: errorInfo });
    
    // You can also log to your own error tracking service
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f8d7da',
          color: '#721c24'
        }}>
          <h1>Something went wrong</h1>
          <p>We're sorry, but an unexpected error occurred.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorHandler;
