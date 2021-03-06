import React, { Component } from "react";
import { Button, CssBaseline } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import { deleteUser, listUsers } from "../redux/ducks/users";

import PropTypes from "prop-types";
import { connect } from "react-redux";


class SystemAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      email: null,
      role: null,
      name: null,
      dob: null,
      gender: null,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.props.listUsers(this.state).then(data => {
      if (data) {
        this.setState({
          id: data.id,
          email: data['email'],
          role: data['role'],
          name: data['name'],
          dob: data['dob'],
          gender: data['gender'],
        });
      } else {
        this.setState({
          id: 2,
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
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'email', headerName: 'Email', width: 130 },
      { field: 'name', headerName: 'Name', width: 130 },
      { field: 'dob', headerName: 'Date of Birth', width: 150,},
      { field: 'gender', headerName: 'Gender', width: 130 },
      { field: 'role', headerName: 'Role', width: 130 },
    ];

    const rows = [];

// for (let i = 0; i < 200; i += 1) {
//  // const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//   rows.push(this.props.listUsers(i).then(data => {
//          this.setState({
//         id: data.id,
//         email: data['email'],
//         role: data['role'],
//         name: data['name'],
//         dob: data['dob'],
//         gender: data['gender'],
//       });
//     }));
// }

    // const rows = [
    //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];


    return (
      <div className="main" data-test="updateContainer" >

        <CssBaseline />
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
        <div style={{ marginTop: 30, marginLeft:590 }}>
          <Button
            type="link"
            data-testid="createuserButton"
            color="secondary"
            variant="contained"
            
           onClick={() => this.goPage("/newaccount")}>
            Create New User
            </Button>

          <Button
            type="link"
            data-testid="updateuserButton"
            color="secondary"
            variant="contained"
            style={{ marginLeft:60 }}
            onClick={() => this.goPage(`/updateuser/${this.state.id}`)}>
            Update User
              </Button>

          <Button
            type="delete"
            data-testid="deleteuserButton"
            color="secondary"
            variant="contained"
            style={{ marginLeft:60 }}
            onClick={() => this.handleDelete()}>
            Delete User
              </Button>


        </div>
      </div>

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