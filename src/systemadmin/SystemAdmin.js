import React, { Component } from "react";
import MaterialTable from 'material-table';
import { deleteUser, listUsers, createUser, updateUser } from "../redux/ducks/users";
import {
  selectUserLoading,
  selectUserFailed,
  selectUser  
} from "../redux/ducks/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from 'react-loader-spinner';

class SystemAdmin extends Component {
    
  componentDidMount() {
      this.props.listUsers();
  }

  render() {
      const {
          usersLoading,
          users,
          createUser,
          updateUser,
          deleteUser
      } = this.props;

      if (usersLoading)
          return <Loader />;

      return (
          <div className="container" data-test="adminTable">
              <MaterialTable 
                  title="User"
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
                          title: 'Role',
                          field: 'role',
                          lookup: {
                              ROLE_DOCTOR: "ROLE_DOCTOR",
                              ROLE_PATIENT: "ROLE_PATIENT",
                              ROLE_ADMIN:"ROLE_ADMIN",
                          },
                      },
                      {
                          title: 'Password',
                          field: 'pass',
                      }
                  ]}
                  data={users}
                  options={{}}
                  editable={{
                      onRowAdd: newData =>
                          new Promise((resolve, reject) => {
                              createUser(newData)
                                  .then(this.setState(users, () => resolve()))
                          }),
                      onRowUpdate: (newData, oldData) =>
                          new Promise((resolve, reject) => {
                              updateUser(newData, oldData)
                                  .then(this.setState(users, () => resolve()))
                          }),
                      onRowDelete: oldData =>
                          new Promise((resolve, reject) => {
                              deleteUser(oldData)
                                  .then(this.setState(users, () => resolve()))
                          }),
                  }}
              />
          </div>
      )
  }
}

SystemAdmin.propTypes = {
  /** A boolean to determine if the users are still being loaded by the `listUsers` action creator (true: still loading, false: fully loaded) */
  usersLoading: PropTypes.bool.isRequired,
  /** A boolean to determine if the users failed to be loaded by the `listUsers` action creator (true: still loading or failed to load, false: successful load) */
  usersFailed: PropTypes.bool,
  /** An array of users objects loaded by the `listUsers` action creator */
  users: PropTypes.array.isRequired,
  /** An action creator for loading accounts from the server*/
  listUsers: PropTypes.func.isRequired,
  /** An action creator for creating a user account */
  createUser: PropTypes.func.isRequired,
  /** An action creator for deleting a user account */
  deleteUser: PropTypes.func.isRequired,
  /** An action creator for updating a user account*/
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userLoading: selectUserLoading(state),
  userFailed: selectUserFailed(state),
  user: selectUser(state)
});


const dispatchers = {
  createUser,
  updateUser,
  deleteUser,
  listUsers,
};

export default connect(mapStateToProps, dispatchers)(SystemAdmin);