import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  createResult,
  listAllPatients,
  selectResults,
  selectResultsFailed,
  selectResultsLoading,
} from '../../../redux/ducks/result';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
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

class PatientsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      patientId: null,
      patientName: null,
      patientEmail: null,
      nodeNum: null,
    };
  }

  componentDidMount() {
    this.props.listAllPatients(this.state);
  }

  render() {
    const {
      patientsLoading,
      patientsFailed,
      patients,
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

    if (patientsLoading) {
      return <CircularProgress />;
    }

    if (patientsFailed) {
      return <Redirect to="/not-found" />;
    }

    const initialState = {
      open: false,
      patientId: null,
      patientName: null,
      patientEmail: null,
      nodeNum: null,
    };

    return (
      <div data-test="patientsTable"
        style={{
          width: '100%',
          padding: '40px',
        }}>
        <MaterialTable
          title="All Patients"
          font=""
          icons={tableIcons}
          columns={[
            {
              title: 'Name',
              field: 'name',

            },
            {
              title: 'Email',
              field: 'email',
            },
            {
              title: 'Age',
              render: (rowData) => (
                calculateAge(rowData.dob)
              ),
            },
            {
              title: 'Gender',
              field: 'gender',
              lookup: {
                FEMALE: 'FEMALE',
                MALE: 'MALE',
              },
            },
            {
              title: 'Test',
              render: (rowData) => (
                <Button variant="outlined" color="primary"
                  onClick={() => {
                    this.setState({
                      open: true,
                      patientId: rowData.id,
                      patientName: rowData.name,
                      patientEmail: rowData.email,
                    });
                  }}>
                  Create Test
                </Button>
              ),
            },
            {
              title: 'Result(s)',
              render: (rowData) => (
                <Button variant="outlined" color="primary" href={`/patient/${rowData.email}`}>
                  View Results
                </Button>
              ),
            },
          ]}
          data={patients}
          options={{}}
        />
        <Dialog fullWidth open={this.state.open}
          onClose={() => {
            this.setState(initialState);
          }}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Add a Test
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              You are about to add a test for the patient:
            </DialogContentText>

            <DialogContentText>
              <strong>Name: </strong> {this.state.patientName}
            </DialogContentText>

            <DialogContentText>
              <strong>Email: </strong> {this.state.patientEmail}
            </DialogContentText>

            <TextField
              required
              autoFocus
              fullWidth
              margin="dense"
              id="nodeNum"
              label="Number of nodes"
              type="number"
              helperText="Please specify the number of nodes to be used"
              onChange={event => {
                const { value } = event.target;
                this.setState({ nodeNum: value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              this.setState(initialState);
            }} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {
              if (!this.state.nodeNum) {
                alert('Number of nodes cannot be empty!');
              } else {
                this.props.createResult({
                  nodeNum: this.state.nodeNum,
                  user: { email: this.state.patientEmail },
                });
                this.setState(initialState);
                window.location.reload();
              }
            }} color="primary">
              Create Test
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}

PatientsPage.propTypes = {
  createResult: PropTypes.func.isRequired,
  listAllPatients: PropTypes.func.isRequired,
  patientsLoading: PropTypes.bool.isRequired,
  patientsFailed: PropTypes.bool,
  patients: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  patientsLoading: selectResultsLoading(state),
  patientsFailed: selectResultsFailed(state),
  patients: selectResults(state),
});

const dispatchers = {
  listAllPatients,
  createResult,
};

export default connect(mapStateToProps, dispatchers)(PatientsPage);