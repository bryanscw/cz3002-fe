import React from 'react';
import Link from '@material-ui/core/Link';
import { CssBaseline } from '@material-ui/core';

/**
 * This component displays a page when requested content is not found.
 */
export default function NotFoundPage() {
  return (
    <div className="container">
      <CssBaseline />
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for can't be found.</p>
      <Link href="/">Return to Home</Link>
    </div>
  );
}
