import React from 'react';
import { Container, Typography, Box, Grid, CardContent, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';

import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
/**
 * This component displays the about page of the web application.
 */
const useStyles = makeStyles({
  root: {
    minWidth: 25,
  },
  pos: {
    fontSize: 15,
    colour: '#9e9e9e',
  },
  name: {
     fontSize: 23,
  },
});
export default function AboutPage() {
  const classes = useStyles();

  return (
    <div className="main">
      <Container component="main" >
        <Typography component="h1" variant="h2" borderRadius={16} color="textPrimary"
          gutterBottom>
          <Box fontSize={110} m={1} borderRadius={16}
            textAlign="center" letterSpacing={8} >
            QWERTY
        </Box>
        </Typography>
        <Typography component="h4" textAlign="center" variant="h2" style={{ marginTop: 15 }} color="black" gutterBottom>
          <Box fontSize={70} textAlign="center" color="textSecondary" letterSpacing={1} >
            <SupervisedUserCircleIcon style={{ fontSize: 123, color: '#616161' }} /><br />
          </Box>
          <Box fontSize={60} textAlign="center" letterSpacing={1} >
            Meet the Team
        </Box>
        </Typography>
        <Grid container direction="row" justify="center"
          alignItems="center" spacing={3} style={{ marginTop: 30 }}>
          <Grid item xs={11} sm={1} md={3}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" className={classes.name} component="h2">
                  Su Voon Hou<br />
                </Typography>
                <p className={classes.pos}>
                  Project Manager
                  </p>
                  </CardContent>
                  <CardActions>
                  <Button size="small" href="https://github.com/voonhous" color="primary">
                  Profile</Button>
                  </CardActions>
            </Card>
          </Grid>
          <Grid item xs={11} sm={4} md={3}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" className={classes.name}  component="h2">
                  Heng Cheng Kiat<br />
                </Typography>
                <p className={classes.pos} >
                  Lead Developer
                  </p>
                  </CardContent>
                  <CardActions>
                  <Button size="small" href="https://github.com/voonhous" color="primary">
                  Profile</Button>
                  </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" className={classes.name} component="h2">
                  Ye Ruiyi<br />
                </Typography>
                <p className={classes.pos} >
                  Release Engineer/Manager
                  </p>
                  </CardContent>
                  <CardActions>
                  <Button size="small" href="https://github.com/yeruiyi" color="primary">
                  Profile</Button>
                  </CardActions>
                  
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={3}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" className={classes.name}  component="h2">
                  Sin Chong Wen Bryan<br />
                </Typography>
                <p  className={classes.pos}>
                  Back-end Developer
                  </p>
                  </CardContent>
                  <CardActions>
                  <Button size="small" href="https://github.com/bryanscw" color="primary">
                  Profile</Button>
                  </CardActions>
                 
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={3}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" className={classes.name}  component="h2">
                  Cassidy Lee Zi Hui<br />
                </Typography>
                <p  className={classes.pos}>
                  Front-end Developer
                  </p>
                  </CardContent>
                  <CardActions>
                  <Button size="small" href="https://github.com/casslzh" color="primary">
                  Profile</Button>
                  </CardActions>
                  
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={3}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" className={classes.name}  component="h2">
                  Ng Man Chun, Jay<br />
                </Typography>
                <p className={classes.pos}>
                  QA Engineer
                  </p>
                  </CardContent>
                  <CardActions>
                  <Button size="small" href="https://github.com/jay-ng-mc" color="primary">
                  Profile</Button>
                  </CardActions>
                    
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={4}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" className={classes.name}  component="h2">
                  Niu Jianan<br />
                </Typography>
                <p className={classes.pos}>
                  QA Manager
                  </p>
                  </CardContent>
                  <CardActions>
                  <Button size="small" href="https://github.com/niujianan" color="primary">
                  Profile</Button>
                  </CardActions>              
            </Card>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
};
