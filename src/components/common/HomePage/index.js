import React, {Component} from "react";
import {connect} from "react-redux";
import {Container, Typography} from "@material-ui/core";
import {selectUser} from "../../../redux/ducks/auth";
import Button from "@material-ui/core/Button";

export class HomePage extends Component {
  render() {
    const {
      user
    } = this.props;

    return (
        <div className="main">
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center"
                        color="textPrimary" gutterBottom>
              Trail Making Test
            </Typography>
            <Typography variant="h5" align="center"
                        color="textSecondary" paragraph>
              Trail Making Test is a simple neuropsychological test of
              cognitive processes, including attention, visual search
              and scanning, and psychomotor speed.
            </Typography>
            {
              user && Object.keys(user).length !== 0 ? (
                  <Button variant="contained" color="primary" href="/">
                    To Dashboard
                  </Button>
              ) : (
                  <p></p>
              )
            }

          </Container>
        </div>
    );
  }

}

const mapStateToProps = state => ({
  user: selectUser(state),
});

export default connect(mapStateToProps)(HomePage);
