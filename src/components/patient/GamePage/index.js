import React, {Component} from "react";
import {connect} from "react-redux";
import {CssBaseline} from "@material-ui/core";

class GamePage extends Component {

  componentDidMount() {

  }

  render() {

    return (
        <div className="main">
          <CssBaseline/>
        </div>
    );
  }

}

GamePage.propType = {}

const mapStateToProps = state => ({});

const dispatchers = {};

export default connect(mapStateToProps, dispatchers)(GamePage);