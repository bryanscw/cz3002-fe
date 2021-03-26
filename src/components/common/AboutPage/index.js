import React from 'react';
import { Container, Typography, Box, Grid, CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
/**
 * This component displays the about page of the web application.
 */
const useStyles = makeStyles({
  root: {
    minWidth: 25,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 12,
    fontSize: 18,
  },
});
export default function AboutPage() {
  const classes = useStyles();

  return (
    <div className="main">
      <Container component="main" style={{ marginTop: 70, marginBottom: 90 }}>
        <Typography component="h1" variant="h2" borderRadius={16} color="textPrimary"
          gutterBottom>
          <Box fontSize={123} m={1} borderRadius={16}
            textAlign="center" letterSpacing={8} >
            QWERTY
        </Box>
        </Typography>
        {/* <Typography component="h3" borderRadius={16}  variant="h2" color="textSecondary" gutterBottom>
          <Box fontSize={25} m={1} textAlign="center" letterSpacing={2} >
          Online Trail Making Test is a web application<br/> developed to facilitate clinical diagnosis. <br/>
         </Box>
        </Typography>      */}
        <Typography component="h4" textAlign="center" variant="h2" style={{ marginTop: 15 }} color="black" gutterBottom>
          <Box fontSize={70} textAlign="center" color="textSecondary" letterSpacing={1} >
            <SupervisedUserCircleIcon style={{ fontSize: 250, color: '#616161' }} /><br />
          </Box>
          <Box fontSize={70} textAlign="center" letterSpacing={1} >
            Meet the Team
        </Box>
        </Typography>
        <Grid container direction="row" justify="center"
          alignItems="center" spacing={3} style={{ marginTop: 30, marginBottom: 90 }}>
          <Grid item xs={11} sm={1} md={3}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Su Voon Hou<br />
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Project Manager
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={11} sm={4} md={3}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Heng Cheng Kiat<br />
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Lead Developer
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Ye Ruiyi<br />
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Release Engineer/Manager
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={3}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Sin Chong Wen Bryan<br />
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Back-end Developer
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={3}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Cassidy Lee Zi Hui<br />
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Front-end Developer
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={3}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Ng Man Chun, Jay<br />
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  QA Engineer
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={4}>
            <Card style={{ width: 280 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Niu Jianan<br />
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  QA Manager
                  </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
};
