import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  listAllResults,
  selectResults,
  selectResultsFailed,
  selectResultsLoading,
} from '../../../redux/ducks/result';
import { connect } from 'react-redux';

class PatientResultsPage extends Component {
  // componentDidMount() {
  //   this.props.match.params.userEmail;
  //   // this.props.listAllResults(this.state);
  // }

  render() {
    // const {
    //   resultsLoading,
    //   resultsFailed,
    //   results,
    // } = this.props;
    //
    // const tableIcons = {
    //   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    //   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    //   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    //   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    //   DetailPanel: forwardRef(
    //     (props, ref) => <ChevronRight {...props} ref={ref} />),
    //   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    //   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    //   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    //   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    //   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    //   NextPage: forwardRef(
    //     (props, ref) => <ChevronRight {...props} ref={ref} />),
    //   PreviousPage: forwardRef(
    //     (props, ref) => <ChevronLeft {...props} ref={ref} />),
    //   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    //   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    //   SortArrow: forwardRef(
    //     (props, ref) => <ArrowUpward {...props} ref={ref} />),
    //   ThirdStateCheck: forwardRef(
    //     (props, ref) => <Remove {...props} ref={ref} />),
    //   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    // };
    //
    // if (resultsLoading) {
    //   return <CircularProgress />;
    // }
    //
    // if (resultsFailed) {
    //   return <Redirect to="/not-found" />;
    // }
    //
    // return (
    //   <div data-test="adminTable"
    //     style={{
    //       width: '100%',
    //       padding: '40px',
    //     }}>
    //     <MaterialTable
    //       title="All Results"
    //       font=""
    //       icons={tableIcons}
    //       columns={[
    //         {
    //           title: 'Name',
    //           field: 'user.name',
    //
    //         },
    //         {
    //           title: 'Email',
    //           field: 'user.email',
    //         },
    //         {
    //           title: 'Date of Birth',
    //           field: 'user.dob',
    //           type: 'date',
    //         },
    //         {
    //           title: 'Gender',
    //           field: 'user.gender',
    //           lookup: {
    //             FEMALE: 'FEMALE',
    //             MALE: 'MALE',
    //           },
    //         },
    //         {
    //           title: 'Time Taken',
    //           field: 'time',
    //         },
    //         {
    //           title: 'Accuracy',
    //           field: 'accuracy',
    //         },
    //         {
    //           title: 'Number of Nodes',
    //           field: 'nodeNum',
    //         },
    //         {
    //           title: 'Result',
    //           render: (rowData) => (
    //             <div>
    //               <Button variant="outlined" color="primary" href={`/result/${rowData.id}`}>
    //                 View
    //               </Button>
    //             </div>
    //           ),
    //         }
    //       ]}
    //       data={results}
    //       options={{}}
    //     />
    //   </div>
    // );
    return (
      <div className="container">
        <p>{this.props.match.params.userEmail}</p>
      </div>
    );
  }

}

PatientResultsPage.propTypes = {
  listAllResults: PropTypes.func.isRequired,
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
};

export default connect(mapStateToProps, dispatchers)(PatientResultsPage);