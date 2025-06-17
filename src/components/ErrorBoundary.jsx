import { Component } from 'react';
import { Link } from '@tanstack/react-router';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="mb-4">{this.state.error.message}</p>
          <Link 
            to="/" 
            className="text-blue-600 hover:underline"
            onClick={() => this.setState({ hasError: false })}
          >
            Return to Home
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}