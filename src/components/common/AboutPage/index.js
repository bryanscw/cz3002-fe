import React from 'react';
import { Container, Typography } from '@material-ui/core';

/**
 * This component displays the about page of the web application.
 */
export default function AboutPage() {
  return (
    <div className="main">
      <Container component="main" maxWidth="sm">
        <Typography component="h1" variant="h2" align="center"
          color="textPrimary" gutterBottom>
          Group Members
        </Typography>
        <Typography variant="h5" align="center"
          color="textSecondary" paragraph>
          Lorem ipsum
        </Typography>

      </Container>
    </div>
  );
};
