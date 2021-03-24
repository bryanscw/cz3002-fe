import React, {Component} from "react";
import {
  listUserResults,
  selectResults,
  selectResultsFailed,
  selectResultsLoading,
} from "../../../redux/ducks/result"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link, Redirect} from 'react-router-dom';
import {selectUser} from "../../../redux/ducks/auth";
import {CircularProgress, Typography} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class Result extends Component {
  componentDidMount() {
    this.props.listUserResults(this.state)
  }

  render = () => {
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
    }));

    const {
      resultsLoading,
      resultsFailed,
      results,
      user
    } = this.props;

    const classes = useStyles();

    if (resultsLoading) {
      return <CircularProgress/>;
    }

    if (resultsFailed) {
      return <Redirect to="/not-found"/>;
    }

    return (
        <div className="container">
          <Link className="btn btn-light mb-2" to="/">
            <FontAwesomeIcon icon={faChevronLeft}/> Back to Home
          </Link>

          <Typography variant="subtitle1">Results for: {user.name}</Typography>
          <br/>

          {
            results.length !== 0 ?
                <div className={classes.root}>
                  <Paper className={classes.paper}>
                    results.map(results.map(result =>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column"
                              spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                              Result ID
                            </Typography>

                            {/*<Typography variant="body2" gutterBottom>
                              Full resolution 1920x1080 • JPEG
                            </Typography>*/}

                            <Typography variant="body2"
                                        color="textSecondary">
                              Number of nodes : {result.numNodes}
                            </Typography>

                            <Typography variant="body2"
                                        color="textSecondary">
                              Time taken : {result.time} seconds
                            </Typography>

                            <Typography variant="body2"
                                        color="textSecondary">
                              Accuracy : {result.accuracy}%
                            </Typography>

                          </Grid>
                          <Grid item>
                            <Typography variant="body2"
                                        style={{cursor: 'pointer'}}>
                              More details...
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography
                              variant="subtitle1">{result.id}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    )
                  </Paper>
                </div>
                :
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  <strong>No</strong> results found
                </Alert>
          }

        </div>
    );
  }
}

Result.propTypes = {
  /** An action creator */
  listUserResults: PropTypes.func.isRequired,
  /** A boolean to determine if the results are still being loaded (true: still loading, false: fully loaded) */
  resultsLoading: PropTypes.bool.isRequired,
  /** A boolean to determine if the users failed to be loaded the action creator(true: still loading or failed to load, false: successful load) */
  resultsFailed: PropTypes.bool,
  /** An array of results objects loaded by the action creator */
  results: PropTypes.array.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  resultsLoading: selectResultsLoading(state),
  resultsFailed: selectResultsFailed(state),
  results: selectResults(state),
  user: selectUser(state),
});

const dispatchers = {
  listUserResults
};

export default connect(mapStateToProps, dispatchers)(Result);