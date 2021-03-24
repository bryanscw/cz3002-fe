import React, {Component} from "react";
import {
  listUserResults,
  selectResults,
  selectResultsFailed,
  selectResultsLoading,
} from "../../../redux/ducks/result"
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link, Redirect} from 'react-router-dom';
import {selectUser} from "../../../redux/ducks/auth";
import {CircularProgress, Typography} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
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
            results.length !== 0 ? (
                    <div className={classes.root}>
                      <Paper className={classes.paper}>
                        results.map(result => result.id)
                      </Paper>
                    </div>
                )
                :
                (
                    <Alert severity="info">
                      <AlertTitle>Info</AlertTitle>
                      <strong>No</strong> results found
                    </Alert>
                )
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