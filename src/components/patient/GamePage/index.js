import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {
  listUserResults,
  selectResults,
  selectResultsFailed,
  selectResultsLoading,
} from '../../../redux/ducks/result';
import Game from './game/Game';

class GamePage extends Component {

  componentDidMount() {
    this.resultId = parseInt(this.props.match.params.resultId);
    this.props.listUserResults(this.state);
  }

  render() {
    const {
      resultsLoading,
      resultsFailed,
      results,
    } = this.props;

    if (resultsLoading) {
      return <CircularProgress />;
    }

    // If failed to fetch results, redirect to not-found
    if (resultsFailed) {
      return <Redirect to="/not-found" />;
    }

    let result = results.find(o => o.id === this.resultId);

    if (!result) {
      return <Redirect to="/not-found" />;
    }

    // If test has been completed
    if (!result.time) {
      return (
        <div className="main">
          <Game time={result.time} accuracy={result.accuracy} nodeNum={result.nodeNum} id={result.id}/>
        </div>
      );
    } else {
      return (
        <div className="main">
          <Alert severity="success">
            <AlertTitle>Test Completed</AlertTitle>
            You have completed this test!
            <Button color="primary"
              href={`/result/${result.id}`}>
              View results
            </Button>
          </Alert>
        </div>
      );
    }
  }

}

GamePage.propType = {
  /** An action creator */
  listUserResults: PropTypes.func.isRequired,
  /** A boolean to determine if the results are still being loaded (true: still loading, false: fully loaded) */
  resultsLoading: PropTypes.bool.isRequired,
  /** A boolean to determine if the users failed to be loaded the action creator(true: still loading or failed to load, false: successful load) */
  resultsFailed: PropTypes.bool,
  /** An array of results objects loaded by the action creator */
  results: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  resultsLoading: selectResultsLoading(state),
  resultsFailed: selectResultsFailed(state),
  results: selectResults(state),
});

const dispatchers = {
  listUserResults,
};

export default connect(mapStateToProps, dispatchers)(GamePage);