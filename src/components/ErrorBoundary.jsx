import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    // Save the error info for detailed debugging
    this.setState({ errorInfo: errorInfo });
    
    // Log error to console
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    // Reset the error state
    this.setState({ hasError: false, error: null, errorInfo: null });
    
    // If a reset action was provided, execute it
    if (this.props.resetAction) {
      this.props.resetAction();
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI with improved styling and details
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-md">
          <div className="flex items-start">
            <div className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-red-700 mb-2">
                Content Rendering Error
              </h2>
              <div className="mb-4">
                <p className="text-red-600 mb-2">
                  {this.state.error}
                </p>
                <p className="text-gray-700">
                  There was a problem displaying this content. This may be due to incorrect formatting or unsupported features.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={this.handleReset} 
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md font-medium transition-colors duration-200 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try again
                </button>
                
                {this.props.fallbackAction && (
                  <button 
                    onClick={this.props.fallbackAction} 
                    className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md font-medium transition-colors duration-200"
                  >
                    View as plain text
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Technical details that can be expanded if needed */}
          {this.state.errorInfo && this.props.showDetails && (
            <div className="mt-4 border-t border-red-200 pt-4">
              <details className="text-sm">
                <summary className="text-red-700 font-medium cursor-pointer">Technical Details</summary>
                <pre className="mt-2 p-3 bg-gray-100 rounded overflow-auto text-xs text-gray-800">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;