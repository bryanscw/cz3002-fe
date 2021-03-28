import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  deleteResult,
  listAllPatientResults,
  selectResults,
  selectResultsFailed,
  selectResultsLoading,
} from '../../../redux/ducks/result';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Remove from '@material-ui/icons/Remove';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ChevronRight from '@material-ui/icons/ChevronRight';
import {
  AddBox,
  Check,
  ChevronLeft,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { calculateAge } from '../../../utils/calculateAge';

class PatientResultsPage extends Component {
  componentDidMount() {
    const userEmail = this.props.match.params.userEmail;
    this.props.listAllPatientResults(userEmail);
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
      <div data-test="patientResultsTable"
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
                  Result
                </Button>
              ),
            },
            {
              title: 'Diagnosis',
              render: (rowData) => (
                rowData.diagnosis ? (
                  <Button variant="outlined" color="primary" href={`/diagnosis/${rowData.id}`}>
                    View
                  </Button>
                ) : (
                  <Button variant="outlined"
                    color="primary"
                    href={`/diagnosis/${rowData.id}/create`}>
                    Create
                  </Button>
                )
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

PatientResultsPage.propTypes = {
  listAllPatientResults: PropTypes.func.isRequired,
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
  listAllPatientResults,
  deleteResult,
};

export default connect(mapStateToProps, dispatchers)(PatientResultsPage);