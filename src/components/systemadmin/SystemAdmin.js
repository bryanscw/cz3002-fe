import React, {Component, forwardRef} from "react";
import MaterialTable from 'material-table';
import {
  createUser,
  deleteUser,
  listUsers,
  selectUsers,
  selectUsersFailed,
  selectUsersLoading,
  updateUser
} from "../../redux/ducks/users";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Loader from 'react-loader-spinner';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

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

    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
      DetailPanel: forwardRef(
          (props, ref) => <ChevronRight {...props} ref={ref}/>),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
      NextPage: forwardRef(
          (props, ref) => <ChevronRight {...props} ref={ref}/>),
      PreviousPage: forwardRef(
          (props, ref) => <ChevronLeft {...props} ref={ref}/>),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
      SortArrow: forwardRef(
          (props, ref) => <ArrowUpward {...props} ref={ref}/>),
      ThirdStateCheck: forwardRef(
          (props, ref) => <Remove {...props} ref={ref}/>),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
    };

    if (usersLoading) {
      return <Loader/>;
    }

    return (
        <div className="container" data-test="adminTable"
             style={{height: 400, width: '100%'}}>
          <MaterialTable
              title="Users"
              icons={tableIcons}
              font=""
              columns={[

                {
                  title: 'Email',
                  field: 'email',
                },
                {
                  title: 'Name',
                  field: 'name',

                },
                {
                  title: 'Password',
                  field: 'pass',

                },
                {
                  title: 'Role',
                  field: 'role',
                  lookup: {
                    ROLE_DOCTOR: "ROLE_DOCTOR",
                    ROLE_PATIENT: "ROLE_PATIENT",
                    ROLE_ADMIN: "ROLE_ADMIN",
                  },
                },
                {
                  title: 'Date of Birth',
                  field: 'dob',
                  type: "date",
                },
                {
                  title: 'Gender',
                  field: 'gender',
                  lookup: {
                    FEMALE: "FEMALE",
                    MALE: "MALE",
                  },
                },
              ]}
              data={users}
              options={{

                cellStyle: {
                  fontFamily: "Helvetica",
                  fontSize: 15,
                },
                headerStyle: {
                  backgroundColor: '#323ea8',
                  color: '#FFF',
                  fontSize: 17,
                }
              }}
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
  usersLoading: selectUsersLoading(state),
  usersFailed: selectUsersFailed(state),
  users: selectUsers(state)
});

const dispatchers = {
  createUser,
  updateUser,
  deleteUser,
  listUsers,
};

export default connect(mapStateToProps, dispatchers)(SystemAdmin);