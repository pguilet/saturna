//Rendering layer control (React router content)
import '../../css/index.css';
import 'materialize-css/dist/css/materialize.min.css'; //we have to precise extension when not importing js files
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import InterfaceHeader from './InterfaceHeader';

class AgentsList extends Component {
  componentDidMount() {
    this.props.fetchPage('agentsList');
    this.props.fetchUsers();
  }
  renderContent() {
    return (
      <div>
        <h4>Liste des comptes des agents</h4>
        <table>
          <thead>
            <tr>
              <th>Identifiant</th>
              <th>Rôle</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {this.props.users
              ? this.props.users.map((user) => {
                  return (
                    <tr>
                      <td>
                        {user.username}
                        {user.googleId}
                      </td>
                      <td>{user.role}</td>
                      <td>
                        <a href="#!" className="secondary-content red-text">
                          <i className="material-icons">delete</i>
                        </a>
                        <a href="#!" className="secondary-content teal-text">
                          <i className="material-icons">mode_edit</i>
                        </a>
                      </td>
                    </tr>
                  );
                })
              : ''}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large teal" href="/surveys/new">
            <i className="material-icons">add</i>
          </a>
        </div>
        
      </div>
    );
  }
}
function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps, actions)(AgentsList);
