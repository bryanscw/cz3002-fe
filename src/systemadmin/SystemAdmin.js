import React, { Component } from "react";
import ReactTable from 'react-table-6';
import { deleteUser, listUsers } from "../redux/ducks/users";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class SystemAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [{
        email: '',
        pass: '',
        role: '',
        name: '',
        dob: '',
        gender: '',
      }],
    };
  }

  componentDidMount() {
    this.props.listUsers(this.state).then(response => {
      this.setState({ tableData: response.data });
    });
  }

  render() {
    const { tableData } = this.state;
    return (
      <div>
        <ReactTable.Default>        
          data={tableData}
          columns={[
            {
              Header: 'Users',
              columns: [
                {
                  Header: 'Email',
                  accessor: '{this.state.tableData.email}',
                },
                {
                  Header: 'Pass',
                  accessor: '{this.state.tableData.pass}'
                },
                {
                  Header: 'name',
                  accessor: '{this.state.tableData.name}'
                },
                {
                  Header: 'role',
                  accessor: '{this.state.tableData.role}'
                },
                {
                  Header: 'dob',
                  accessor: '{this.state.tableData.dob}'
                },
                {
                  Header: 'gender',
                  accessor: '{this.state.tableData.gender}'
                }
              ],
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          </ReactTable.Default>
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