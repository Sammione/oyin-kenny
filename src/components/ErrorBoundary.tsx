import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 border-t-4 border-red-500">
            <h2 className="text-xl font-bold text-red-700 mb-2">Something went wrong</h2>
            <p className="text-stone-600 mb-4 text-sm">The app crashed with the following error:</p>
            <pre className="bg-red-50 text-red-800 text-xs p-4 rounded-lg overflow-auto max-h-48 whitespace-pre-wrap">
              {this.state.error?.message}
              {'\n'}
              {this.state.error?.stack}
            </pre>
            <p className="text-stone-500 text-xs mt-4">
              If this says "createClient" or "supabase", check that your Vercel environment variables
              (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are set correctly.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-stone-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-stone-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
