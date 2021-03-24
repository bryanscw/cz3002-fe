import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

import {closeError, selectErrors} from '../../../redux/ducks/errors';
import './styles.css';

/**
 * This component is used to display errors.
 */
export class Errors extends Component {
    render() {
        const {
            errors,
        } = this.props;

        return (
            <div className="error-wrapper">
                {
                    errors.map(error => (
                        <div className={`toast ${error.isVisible ? "error-shown" : "error-hidden"}`} key={error.id}>
                            <div className="toast-header">
                                <strong className="mr-auto text-danger">
                                    <FontAwesomeIcon icon={faExclamationTriangle}/> Error
                                </strong>
                                <button className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"
                                        onClick={() => this.props.closeError(error.id)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="toast-body">{error.message}</div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

Errors.propTypes = {
    /** An object containing all errors*/
    errors: PropTypes.array.isRequired,
    /** A function for closing a particular error*/
    closeError: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    errors: selectErrors(state),
});

const dispatchers = {
    closeError,
};

export default connect(mapStateToProps, dispatchers)(Errors);
