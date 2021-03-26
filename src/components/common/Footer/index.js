import React from 'react';
import Link from '@material-ui/core/Link';
import { Typography, Container } from '@material-ui/core';
import './index.css';

/**
 * This component displays the footer of the web application.
 */
export default function Footer() {
  return (
    <div className="footer">
      <Container component="main" maxWidth="s" align="center">
       {/* //   style={{  position: "relative", bottom: "0", width:"100%" }} */}
      <Typography className="footer" variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="/about">
          QWERTY
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      </Container>
    </div>
  );
}