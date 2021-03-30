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
  Breadcrumbs,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  breadcrumbs: {
    marginLeft: 1,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  paper: {
    padding: 50,
    justifyContent: 'center',
    margin: 'auto',
  },
  divButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 50,
  },
});

class DiagnosisPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      label: null,
      description: null,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    const resultId = parseInt(this.props.match.params.resultId);
    this.props.fetchDiagnosis(resultId);
  }

  render() {

    const {
      classes,
      diagnosisLoading,
      diagnosisFailed,
      diagnosis,
    } = this.props;

    if (diagnosisLoading) {
      return <CircularProgress align="center"
      style={{
        marginTop:190,
        marginLeft: 690,
      }} />;
  }
    

    // If failed to fetch resources, redirect to not-found
    // Some check is done in componentDidMount, do a check again to be safe
    if (diagnosisFailed) {
      return <Redirect to="/not-found" />;
    }

    const initialState = {
      open: false,
      label: diagnosis.label,
      description: diagnosis.description,
    };

    const labels = ['High', 'Moderate', 'Low'];
    return (
      <Container>
        <Breadcrumbs className={classes.breadcrumbs} separator="›" aria-label="breadcrumb">
          <Link color="inherit" href="/results">
            Result
          </Link>
          <Link color="inherit" href={`/result/${diagnosis.result}`}>
            {diagnosis.result}
          </Link>
          <Typography color="textPrimary">Diagnosis</Typography>
        </Breadcrumbs>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography gutterBottom>Created By</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {diagnosis.createdBy}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Created Date</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {Moment(diagnosis.createdDate).format('DD-MM-YYYY')}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Last Modified By</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {diagnosis.lastModifiedBy}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Last Modified Date</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {Moment(diagnosis.lastModifiedDate).format('DD-MM-YYYY')}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Label</Typography>
              <div>
                {
                  labels.map(
                    label => (
                      label === diagnosis.label
                        ?
                        <Chip key={label} className={classes.chip} label={label} color="primary" />
                        :
                        <Chip key={label} className={classes.chip} label={label} />
                    ),
                  )
                }
              </div>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Diagnosis Description</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {diagnosis.description}
              </Typography>
            </Grid>
          </Grid>

          <div className={classes.divButton}>
            <Button variant="contained" color="primary"
              onClick={() => {
                this.setState({
                  open: true,
                  label: diagnosis.label,
                  description: diagnosis.description,
                });
              }}>
              Edit Diagnosis
            </Button>
          </div>
        </Paper>

        <Dialog
          fullWidth
          open={this.state.open}
          onClose={() => {
            this.setState(initialState);
          }}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="max-width-dialog-title">
            Modify Diagnosis
          </DialogTitle>
          <form noValidate>
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                select
                margin="dense"
                id="label"
                name="label"
                type="text"
                helperText="Please input the severity"
                value={this.state.label}
                onChange={this.handleChange}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Moderate">Moderate</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>
            </DialogContent>
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                multiline
                margin="dense"
                id="description"
                name="description"
                type="text"
                helperText="Please input the description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </DialogContent>
          </form>
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
  diagnosisLoading: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, dispatchers)(withStyles(styles)(DiagnosisPage));