import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { closeError, selectErrors } from '../../../redux/ducks/errors';
import './styles.css';

/**
 * This component is used to display errors.
 */
export class Errors extends Component {
  render() {
    const {
      errors,
    } = this.props;


    function Alert(props) {
      return <MuiAlert
        elevation={6} variant="filled" {...props} />;
    }
    return (
      <div className="error-wrapper">
        {
          errors.map(error => (
            <div className={`toast ${error.isVisible ? 'error-shown'
              : 'error-hidden'}`} key={error.id}>
              <div className="toast-header">
                <Snackbar open={error.id} autoHideDuration={6000} onClose={() => this.props.closeError(error.id)}>
                  <Alert style={{  height: 50, fontSize: 15, fontFamily: 'Helvetica' }} onClose={() => this.props.closeError(error.id)} severity="error">
                    {error.message}
                  </Alert>
                </Snackbar>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

Errors.propTypes = {
  /** An object containing all errors*/
  errors: PropTypes.array.isRequired,
  /** A function for closing a particular error*/
  closeError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: selectErrors(state),
});

const dispatchers = {
  closeError,
};

export default connect(mapStateToProps, dispatchers)(Errors);
