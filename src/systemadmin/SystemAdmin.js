import React, { Component } from "react";
import { Button, CssBaseline } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import { deleteUser, listUsers } from "../redux/ducks/users";
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from "@material-ui/core/CardContent";
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        QWERTY
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class SystemAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
       email: null,
      pass: null,
      role: null,
      name: null,
      dob: null,
      gender: null,
    };
  }
  validateForm() {
    if (
      this.state.label == null ||
      this.state.description == null

    )
      return false;
    else
      return (
        this.state.label.length > 0 &&
        this.state.description.length > 0

      );
  }

  handleInputChange = input => e => {
    this.setState({ [input]: e.target.value })
  }


  componentDidMount() {
    this.props.listUsers(this.state).then(data => {
      if (data) {
        this.setState({
        
          email: data['email'],
          role: data['role'],
          name: data['name'],
          dob: data['dob'],
          gender: data['gender'],
        });
      } else {
        this.setState({
       
          email: 0,
          role: 0,
          name: 0,
          dob: 0,
          gender: 0,
        });
        this.forceUpdate();
      }

    })
  }

  handleDelete = () => {

    this.props.deleteUser(this.state)
  }

  goPage = (page) => {
    this.props.history.push(page);
  }

  render() {
    console.log(this.state);


    // const { data } = listUsers({
    //   dataSet: 'Users',
    //   rowLength: 100,
    //   maxColumns: 6,
    // });

    const columns = [
      { field: 'email', headerName: 'Email', width: 130 },
      { field: 'name', headerName: 'Name', width: 130 },
      { field: 'dob', headerName: 'Date of Birth', width: 150, },
      { field: 'gender', headerName: 'Gender', width: 130 },
      { field: 'role', headerName: 'Role', width: 130 },
    ];

    const rows = [];

    const classes = makeStyles((theme) => ({
      icon: {
        marginRight: theme.spacing(2),
      },
      heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      },
      heroButtons: {
        marginTop: theme.spacing(4),
      },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
      footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(10),
        marginTop: 20
      },
    }));
    const cards = [{ name: 'Manage Accounts', button: "Update" }]

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" align="center" noWrap>
              TRAIL MAKING TEST
              </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <CssBaseline />
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
          </div>

          <div style={{ marginTop: 30 }}>
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                {cards.map((card) => (
                  <Grid item key={card} xs={23} sm={6} md={10}>
                    <Card className={classes.card} style={{ height: 140 }}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          type="link"
                          data-testid="createuserButton"
                          color="secondary"
                          variant="contained"
                          style={{ marginLeft: 70 }}
                          onClick={() => this.goPage("/newaccount")}>
                          Create New User
            </Button>

                        <Button
                          type="link"
                          data-testid="updateuserButton"
                          color="secondary"
                          variant="contained"
                          style={{ marginLeft: 60 }}
                          onClick={() => this.goPage(`/updateuser/${this.state.id}`)}>
                          Update User
              </Button>

                        <Button
                          type="delete"
                          data-testid="deleteuserButton"
                          color="secondary"
                          variant="contained"
                          style={{ marginLeft: 60 }}
                          onClick={() => this.handleDelete()}>
                          Delete User
              </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        </main>
        {/* Footer */}
        <div style={{ marginTop: 30 }}>
          <footer className={classes.footer}>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              This is a school project for CZ3002.
            </Typography>
            <Copyright />
          </footer>
        </div>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

SystemAdmin.propTypes = {
  /** An action creator for authenticating login */
  listUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired

};

const dispatchers = {
  listUsers,
  deleteUser
};

export default connect(() => ({}), dispatchers)(SystemAdmin);