import React from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import './index.css';

/**
 * This component displays the footer of the web application.
 */
export default function Footer() {
  return (
    <div className="footer">
      <Container component="main" align="center">
        <Typography className="footer" variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Button style={{ height: 30 }}
            variant="outlined"
            color="inherit"
            href="/about">QWERTY</Button>
          {' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </div>
  );
}
