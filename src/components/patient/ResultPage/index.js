import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  listUserResults,
  selectResults,
  selectResultsFailed,
  selectResultsLoading
} from "../../../redux/ducks/result";
import {CircularProgress} from "@material-ui/core";
import {Redirect} from 'react-router-dom';

class ResultPage extends Component {

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
      return <CircularProgress/>;
    }

    if (resultsFailed) {
      return <Redirect to="/not-found"/>;
    }

    let result = results.find(o => o.id === this.resultId);
    console.log(resultId);
    console.log(result);
    return (
        <p>{JSON.stringify(result)}</p>
    );
  }

}

ResultPage.propTypes = {
  /** An action creator */
  listUserResults: PropTypes.func.isRequired,
  /** A boolean to determine if the results are still being loaded (true: still loading, false: fully loaded) */
  resultsLoading: PropTypes.bool.isRequired,
  /** A boolean to determine if the users failed to be loaded the action creator(true: still loading or failed to load, false: successful load) */
  resultsFailed: PropTypes.bool,
  /** An array of results objects loaded by the action creator */
  results: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  resultsLoading: selectResultsLoading(state),
  resultsFailed: selectResultsFailed(state),
  results: selectResults(state),
});

const dispatchers = {
  listUserResults
};

export default connect(mapStateToProps, dispatchers)(ResultPage);