import { Component } from 'react';

/**
 * Catches render/lifecycle errors in its subtree so a single failing view
 * degrades to a recoverable fallback instead of unmounting the whole app to a
 * blank page. The error is still surfaced to the console (and any global
 * `window.onerror` handler) so it is never silently swallowed.
 *
 * Pass a `resetKey` (e.g. the current route) — when it changes the boundary
 * clears its error state, so navigating away from a broken view recovers
 * without a full page reload.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.error && props.resetKey !== state.resetKey) {
      return { error: null, resetKey: props.resetKey };
    }
    if (state.resetKey !== props.resetKey) {
      return { resetKey: props.resetKey };
    }
    return null;
  }

  componentDidCatch(error, info) {
    // Keep the error observable to the console and any injected reporter
    // (e.g. Sentry) rather than swallowing it.
    console.error('Unhandled UI error caught by ErrorBoundary:', error, info?.componentStack);
    this.props.onError?.(error, info);
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;

    if (this.props.fallback) {
      return typeof this.props.fallback === 'function'
        ? this.props.fallback({ error: this.state.error, reset: this.handleReset })
        : this.props.fallback;
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md text-center">
          <div className="space-y-2">
            <h1 className="font-heading text-6xl font-light text-slate-300">Oops</h1>
            <div className="mx-auto h-0.5 w-16 bg-slate-200" />
          </div>
          <h2 className="mt-6 font-heading text-2xl font-medium text-slate-800">
            Something went wrong
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            An unexpected error interrupted this page. You can try again or head back home.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => { window.location.href = '/'; }}
              className="inline-flex items-center rounded-lg border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}
