import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  deleteResult,
  listAllResults,
  selectResults,
  selectResultsFailed,
  selectResultsLoading,
} from '../../../redux/ducks/result';
import { CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Edit from '@material-ui/icons/Edit';
import SaveAlt from '@material-ui/icons/SaveAlt';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Search from '@material-ui/icons/Search';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Remove from '@material-ui/icons/Remove';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { calculateAge } from '../../../utils/calculateAge';

class ResultsPage extends Component {
  componentDidMount() {
    this.props.listAllResults(this.state);
  }

  render() {
    const {
      resultsLoading,
      resultsFailed,
      results,
      deleteResult
    } = this.props;

    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef(
        (props, ref) => <ChevronRight {...props} ref={ref} />),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef(
        (props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef(
        (props, ref) => <ChevronLeft {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef(
        (props, ref) => <ArrowUpward {...props} ref={ref} />),
      ThirdStateCheck: forwardRef(
        (props, ref) => <Remove {...props} ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    };

    if (resultsLoading) {
      return <CircularProgress />;
    }

    if (resultsFailed) {
      return <Redirect to="/not-found" />;
    }

    return (
      <div data-test="resultsTable"
        style={{
          width: '100%',
          padding: '40px',
        }}>
        <MaterialTable
          title="All Results"
          font=""
          icons={tableIcons}
          columns={[
            {
              title: 'Name',
              field: 'user.name',

            },
            {
              title: 'Email',
              field: 'user.email',
            },
            {
              title: 'Age',
              render: (rowData) => (
                calculateAge(rowData.user.dob)
              ),
            },
            {
              title: 'Gender',
              field: 'user.gender',
              lookup: {
                FEMALE: 'FEMALE',
                MALE: 'MALE',
              },
            },
            {
              title: 'Time Taken',
              field: 'time',
            },
            {
              title: 'Accuracy',
              field: 'accuracy',
            },
            {
              title: 'Number of Nodes',
              field: 'nodeNum',
            },
            {
              title: 'Result',
              render: (rowData) => (
                <Button variant="outlined" color="primary" href={`/result/${rowData.id}`}>
                  View
                </Button>
              ),
            },
          ]}
          data={results}
          options={{}}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                deleteResult(oldData.id)
                  .then(this.setState(results, () => resolve()));
              }),
          }}
        />
      </div>
    );
  }

}

ResultsPage.propTypes = {
  listAllResults: PropTypes.func.isRequired,
  deleteResult: PropTypes.func.isRequired,
  resultsLoading: PropTypes.bool.isRequired,
  resultsFailed: PropTypes.bool,
  results: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  resultsLoading: selectResultsLoading(state),
  resultsFailed: selectResultsFailed(state),
  results: selectResults(state),
});

const dispatchers = {
  listAllResults,
  deleteResult
};

export default connect(mapStateToProps, dispatchers)(ResultsPage);