import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';

export default function DoctorHomePage() {
  return (
    <Container maxWidth="md" align="center"
    style={{ marginTop: 150 }}>
      <Grid container direction="row" justify="center"
        alignItems="center" spacing={4}>
                  <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                All Patients
              </Typography>
            </CardContent>
            <CardActions>
              <Button assize="small" color="primary" href="/patients">
                Go
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                All Results
              </Typography>
            </CardContent>
            <CardActions>
              <Button assize="small" color="primary" href="/results">
                Go
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Pending Diagnosis
              </Typography>
            </CardContent>
            <CardActions>
              <Button assize="small" color="primary" href="/diagnosis/pending">
                Go
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}