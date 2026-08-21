import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Keep the UI usable; reporting can be added here when an observability service is configured.
    console.error('Application render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary" role="alert">
          <div>
            <p className="error-boundary__eyebrow">Something went wrong</p>
            <h1>Unable to load this page</h1>
            <p>Please refresh the page or return home and try again.</p>
            <Link to="/" className="error-boundary__button">Back to home</Link>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
