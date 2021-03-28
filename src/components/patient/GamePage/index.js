import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {
  fetchResult,
  selectResult,
  selectResultFailed,
  selectResultLoading,
} from '../../../redux/ducks/result';
import Game from './game/Game';

class GamePage extends Component {

  componentDidMount() {
    const resultId = parseInt(this.props.match.params.resultId);
    this.props.fetchResult(resultId);
  }

  render() {
    const {
      resultLoading,
      resultFailed,
      result,
    } = this.props;

    if (resultLoading) {
      return <CircularProgress align="center"
        style={{
          marginTop: 200,
          marginLeft: 860,
        }} />;
    }

    // If failed to fetch results, redirect to not-found
    if (resultFailed) {
      return <Redirect to="/not-found" />;
    }

    // If test has been completed
    if (!result.time) {
      return (
        <div className="main">
          <Game time={result.time}
            accuracy={result.accuracy}
            nodeNum={result.nodeNum}
            id={result.id} />
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
  fetchResult: PropTypes.func.isRequired,
  resultLoading: PropTypes.bool.isRequired,
  resultFailed: PropTypes.bool,
  result: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  resultLoading: selectResultLoading(state),
  resultFailed: selectResultFailed(state),
  result: selectResult(state),
});

const dispatchers = {
  fetchResult,
};

export default connect(mapStateToProps, dispatchers)(GamePage);