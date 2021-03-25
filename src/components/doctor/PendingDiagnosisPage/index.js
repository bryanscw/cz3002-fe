import React, { Component } from 'react';
import { connect } from 'react-redux';

class PendingDiagnosisPage extends Component {

  render() {
    return(
      <p>TODO: Implement this page</p>
    );
  }

}

PendingDiagnosisPage.propTypes = {

};

const mapStateToProps = state => ({});

const dispatchers = {};

export default connect(mapStateToProps, dispatchers)(PendingDiagnosisPage);