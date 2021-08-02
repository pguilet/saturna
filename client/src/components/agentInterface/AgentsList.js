//Rendering layer control (React router content)
import '../../css/index.css';
// import 'materialize-css/dist/css/materialize.min.css'; //we have to precise extension when not importing js files
import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import GuardedRoute from '../GuardedRoute';
import { unmountComponentAtNode, render } from 'react-dom';
import NewAgentForm from './NewAgentForm';

class AgentsList extends Component {
     state = {
          showNewAgentForm: false,
          backButtonTriggered: false,
          createUserButtonTriggered: false,
          editMode: false,
     };
     componentDidMount() {
          this.props.fetchPage('agentsList');
          this.props.fetchUsers();
          this.closeNewAgentForm = this.closeNewAgentForm.bind(this);
     }
     renderContent() {
          var key = 0;
          return (
               <div>
                    <h4>Liste des comptes des agents</h4>
                    <table>
                         <thead>
                              <tr>
                                   <th>Identifiant</th>
                                   <th>Rôle</th>
                              </tr>
                         </thead>
                         <tbody>
                              {this.props.users
                                   ? this.props.users.map((user) => {
                                          key += 4;
                                          return (
                                               <tr key={key + 1}>
                                                    <td>
                                                         {user.username}
                                                         {user.googleId}
                                                    </td>
                                                    <td>{user.role}</td>
                                                    <td>
                                                         <a
                                                              onClick={() =>
                                                                   this.props.deleteUser(
                                                                        user.username
                                                                   )
                                                              }
                                                              href="#!"
                                                              className="secondary-content red-text"
                                                         >
                                                              <i className="material-icons">
                                                                   delete
                                                              </i>
                                                         </a>
                                                         <a
                                                              onClick={() => {

                                                                   this.setState(
                                                                        {
                                                                             showNewAgentForm: true,
                                                                             backButtonTriggered: false,
                                                                             createUserButtonTriggered: false,
                                                                             editMode:
                                                                                  {
                                                                                       username:
                                                                                            user.username,
                                                                                       role: user.role,
                                                                                  },
                                                                        }
                                                                   );
                                                              }}
                                                              href="#!"
                                                              className="secondary-content teal-text"
                                                         >
                                                              <i className="material-icons">
                                                                   mode_edit
                                                              </i>
                                                         </a>
                                                    </td>
                                               </tr>
                                          );
                                     })
                                   : null}
                         </tbody>
                    </table>
               </div>
          );
     }

     closeNewAgentForm(actionFromBackButton, actionFromNewUserButton) {
          this.setState({
               backButtonTriggered: actionFromBackButton,
               createUserButtonTriggered: actionFromNewUserButton
          });
     }
     computeFormOpeningStatus(showNewAgentForm, flash) {
          
          if (this.state.backButtonTriggered) {
               return false;
          } else if (this.state.createUserButtonTriggered) {
               if (flash && flash.message) {
                    return true;
               } else if (flash && flash.message === false) {
                    return false;
               } else {
                    return true;
               }
          } else {
               if (showNewAgentForm) {
                    return true;
               } else {
                    return false;
               }
          }
     }
     renderNewAgentForm() {
          if (
               this.computeFormOpeningStatus(
                    this.state.showNewAgentForm,
                    this.props.flash
               )
          ) {
               return (
                    <NewAgentForm
                         doOpen={true}
                         onTheClose={this.closeNewAgentForm}
                         editMode={this.state.editMode}
                    />
               );
          }
     }

     render() {
          return (
               <div>
                    {this.renderNewAgentForm()}
                    {this.renderContent()}
                    <div className="fixed-action-btn">
                         <div
                              className="btn-floating btn-large teal"
                              onClick={() =>
                                   this.setState({
                                        showNewAgentForm: true,
                                        backButtonTriggered: false,
                                        createUserButtonTriggered: false,
                                        editMode: false,
                                   })
                              }
                         >
                              <i className="material-icons">add</i>
                         </div>
                    </div>
               </div>
          );
     }
}
function mapStateToProps({ users, flash }) {
     return { users, flash };
}

export default connect(mapStateToProps, actions)(AgentsList);
