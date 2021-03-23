import React from 'react';
import {Link} from 'react-router-dom';

/**
 * This component displays the footer of the web application.
 */
export default function NotFoundPage() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          QWERTY
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}