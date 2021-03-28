import React from 'react';
import { Box, Button, CardContent, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

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

  const teamMembers = [
    {
      name: 'Cassidy Lee Zi Hui',
      role: 'Front-end Developer',
      github: 'https://github.com/casslzh',
    },
    {
      name: 'Heng Cheng Kiat',
      role: 'Lead Developer',
      github: 'https://github.com/hengchengkiat',
    },
    {
      name: 'Ng Man Chun',
      role: 'QA Engineer',
      github: 'https://github.com/jay-ng-mc',
    },
    {
      name: 'Niu Jianan',
      role: 'Project Manager',
      github: 'https://github.com/niujianan',
    },
    {
      name: 'Su Voon Hou',
      role: 'Project Manager',
      github: 'https://github.com/voonhous',
    },
    {
      name: 'Sin Chong Wen Bryan',
      role: 'Backend Developer',
      github: 'https://github.com/bryanscw',
    },
    {
      name: 'Ye Ruiyi',
      role: 'Project Manager',
      github: 'https://github.com/yeruiyi',
    },
  ];

  return (
    <div className="main">
      <Container component="main">
        <Typography component="h1" variant="h2" borderRadius={16} color="textPrimary"
          gutterBottom>
          <Box fontSize={110} m={1} borderRadius={16}
            textAlign="center" letterSpacing={8}>
            QWERTY
          </Box>
        </Typography>
        <Typography component="h4"
          textAlign="center"
          variant="h2"
          style={{ marginTop: 15 }}
          color="black"
          gutterBottom>
          <Box fontSize={70} textAlign="center" color="textSecondary" letterSpacing={1}>
            <SupervisedUserCircleIcon style={{
              fontSize: 123,
              color: '#616161',
            }} /><br />
          </Box>
          <Box fontSize={60} textAlign="center" letterSpacing={1}>
            Meet the Team
          </Box>
        </Typography>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
          style={{ marginTop: 30 }}>
          {
            teamMembers.map(member => (
              <Grid item xs={11} sm={1} md={3}>
                <Card style={{ width: 280 }}>
                  <CardContent>
                    <Typography gutterBottom
                      variant="h5"
                      className={classes.name}
                      component="h2">{member.name}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {member.role}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={member.github} color="primary">
                      Github
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </div>
  );
};
