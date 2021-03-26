import React from 'react';
import Link from '@material-ui/core/Link';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';
/**
 * This component displays a page when requested content is not found.
 */
export default function NotFoundPage() {
  return (
    <div className="container">
      <Container component="main" maxWidth="s" align="center"
        style={{ marginTop: 150, marginBottom: 30 }}>

        <Typography variant="h2" style={{ marginBottom: 20 }}><ReportProblemRoundedIcon style={{ fontSize: 40 }} />    404 Not Found</Typography>
        <Typography variant="h5" style={{ marginBottom: 20 }}>Sorry, the page you are looking for can't be found.</Typography>
     
        <Button
          data-testid="home"
          type="submit"
          href="/"          
          variant="contained"
          color="secondary"
          style={{
            marginTop: 20,
            marginBottom: 30,
            height: 40, fontSize: 16
          }}
        >Return to Home</Button>

      </Container>
    </div>
  );
}
