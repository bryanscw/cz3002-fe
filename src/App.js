import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import CardContent from "@material-ui/core/CardContent";
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { BrowserRouter as Router, Route, Switch,useParams, Link as RouterLink } from "react-router-dom";
import AppRouter from './AppRouter.js'

import store from './redux/store.js'
import {Provider} from 'react-redux'

import './App.css';
import Game from './game/Game';
import ResultController from './results/ResultController.jsx';

function Copyright() {
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


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
const cards = [{name:'GAME',button:"START"},{name:'RESULT',button:'VIEW'},{name:'TOPIC',button:'MORE'}]

function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" align="center" noWrap>
            TRAIL MAKING TEST
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Trail Making Test
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Trail Making Test is a simple neuropsychological test of cognitive processes, including attention, visual search and scanning, and psychomotor speed. 
            </Typography>
          </Container>
        </div>
        <Router>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container  direction="row" justify="center" alignItems="center" spacing={4}>
            {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <RouterLink to={`/${card.name}`}>
                        <Button assize="small" color="primary">
                          {card.button}
                        </Button>
                      </RouterLink>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
          <div>
              <Switch>
              <Route path="/game"><Game /></Route>
              <Route path="/result"><ResultController path="/result"/></Route>
              <Route path="/topic"><Topic /></Route>
              </Switch>
          </div>
          {/* <AppRouter/> */}
        </Router>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          This is a school project for CZ3002. 
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

export default function App() {
  return (
    <Provider store={store}>
        <Album/>
    </Provider>
  )
}
