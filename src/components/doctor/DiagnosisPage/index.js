import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchDiagnosis,
  selectDiagnosis,
  selectDiagnosisFailed,
  selectDiagnosisLoading,
  updateDiagnosis,
} from '../../../redux/ducks/diagnosis';
import {
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';

class DiagnosisPage extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      label: null,
      description: null,
    };
  }

  componentDidMount() {
    const resultId = parseInt(this.props.match.params.resultId);
    this.props.fetchDiagnosis(resultId);
  }

  render() {
    const {
      diagnosisLoading,
      diagnosisFailed,
      diagnosis,
    } = this.props;

    if (diagnosisLoading) {
      return <CircularProgress />;
    }

    // If failed to fetch results, redirect to not-found
    if (diagnosisFailed) {
      return <Redirect to="/not-found" />;
    }

    const initialState = {
      open: false,
      label: diagnosis.label,
      description: diagnosis.description,
    };

    const fullWidth = true;

    return (
      <Container>
        <p>{JSON.stringify(diagnosis)}</p>

        <Button variant="outlined" color="primary"
          onClick={() => {
            this.setState({
              open: true,
              label: diagnosis.label,
              description: diagnosis.description,
            });
          }}>
          Edit Diagnosis
        </Button>

        <Dialog
          fullWidth={fullWidth}
          open={this.state.open}
          onClose={() => {
            this.setState(initialState);
          }}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="max-width-dialog-title">
            Modify Diagnosis
          </DialogTitle>
          <DialogContent dividers>
            <form noValidate>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Label</InputLabel>
                    <Select
                      autoFocus
                      name="label"
                      value={this.state.label}
                      onChange={this.handleChange}
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Moderate">Moderate</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="description"
                      name="description"
                      label="Description"
                      type="description"
                      fullWidth
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              this.setState(initialState);
            }} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {

              if (!this.state.label) {
                alert('Label cannot be empty!');
              } else if (!this.state.description) {
                alert('Description cannot be empty!');
              } else {
                this.setState(initialState);
                this.props.updateDiagnosis(
                  diagnosis.result,
                  {
                    label: this.state.label,
                    description: this.state.description,
                  });
                window.location.replace(`/diagnosis/${diagnosis.result}`);
              }

            }} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }

}

DiagnosisPage.propType = {
  fetchDiagnosis: PropTypes.func.isRequired,
  updateDiagnosis: PropTypes.func.isRequired,
  diagnosisLoad: PropTypes.bool.isRequired,
  diagnosisFailed: PropTypes.bool,
  diagnosis: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  diagnosisLoading: selectDiagnosisLoading(state),
  diagnosisFailed: selectDiagnosisFailed(state),
  diagnosis: selectDiagnosis(state),
});

const dispatchers = {
  fetchDiagnosis,
  updateDiagnosis,
};

export default connect(mapStateToProps, dispatchers)(DiagnosisPage);