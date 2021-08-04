//Rendering layer control (React router content)
import '../../css/index.css';
// import 'materialize-css/dist/css/materialize.min.css'; //we have to precise extension when not importing js files
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import FocusForm from './FocusForm';
import CustomField from '../customs/CustomField';
import { Roles } from '../../actions/types';

class AgentsList extends Component {
     state = {
          showFocusForm: false,
          backButtonTriggered: false,
          createUserButtonTriggered: false,
          username: undefined,
          validateButtonAction: undefined,
          title: undefined,
          description: undefined,
          validateButtonLabel: undefined,
          fieldsToDisplay: undefined,
     };
     componentDidMount() {
          this.props.fetchPage('agentsList');
          this.props.fetchUsers();
          this.closeFocusForm = this.closeFocusForm.bind(this);
     }

     resetState(user) {
          if (this.props.flash) {
               this.props.flash.message = false;
          }
          this.setState({
               showFocusForm: true,
               backButtonTriggered: false,
               createUserButtonTriggered: false,
          });
          if (user) {
               this.setState({
                    username: user.username,
               });
          }
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
                                                              onClick={() => {
                                                                   this.resetState(
                                                                        user
                                                                   );
                                                                   this.setState(
                                                                        {
                                                                             validateButtonAction:
                                                                                  this
                                                                                       .props
                                                                                       .deleteUser,
                                                                             title: "Suppression d'utilisateur",
                                                                             description:
                                                                                  "Etes-vous sûr de vouloir supprimer l'agent?",
                                                                             validateButtonLabel:
                                                                                  "Supprimer l'utilisateur",
                                                                             fieldsToDisplay:
                                                                                  [],
                                                                        }
                                                                   );
                                                              }}
                                                              href="#!"
                                                              className="secondary-content red-text"
                                                         >
                                                              <i className="material-icons">
                                                                   delete
                                                              </i>
                                                         </a>
                                                         <a
                                                              onClick={() => {
                                                                   this.resetState(
                                                                        user
                                                                   );
                                                                   this.setState(
                                                                        {
                                                                             validateButtonAction:
                                                                                  this
                                                                                       .props
                                                                                       .editUser,

                                                                             title: "Edition de l'utilisateur",
                                                                             description:
                                                                                  "Veuillez sélectionner le rôle de l'agent et un nouveau password ou laisser le vide pour qu'il ne soit pas changé.",
                                                                             validateButtonLabel:
                                                                                  "Editer l'utilisateur",
                                                                             fieldsToDisplay:
                                                                                  [
                                                                                       {
                                                                                            label: 'Username',
                                                                                            id: 'username',
                                                                                            type: 'text',
                                                                                            component:
                                                                                                 CustomField,
                                                                                            disabled: true,
                                                                                            valueToSet:
                                                                                                 user.username,
                                                                                       },
                                                                                       {
                                                                                            label: 'Password',
                                                                                            id: 'password',
                                                                                            type: 'text',
                                                                                            component:
                                                                                                 CustomField,
                                                                                       },
                                                                                       {
                                                                                            label: 'Rôle',
                                                                                            id: 'role',
                                                                                            type: 'select',
                                                                                            component:
                                                                                                 'select',
                                                                                            valueToSet:
                                                                                                 user.role,
                                                                                            values: Roles,
                                                                                       },
                                                                                  ],
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

     closeFocusForm(actionFromBackButton, actionFromNewUserButton) {
          this.setState({
               backButtonTriggered: actionFromBackButton,
               createUserButtonTriggered: actionFromNewUserButton,
          });
     }
     computeFormOpeningStatus(showFocusForm, flash) {
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
               if (showFocusForm) {
                    return true;
               } else {
                    return false;
               }
          }
     }
     renderFocusForm() {
          if (
               this.computeFormOpeningStatus(
                    this.state.showFocusForm,
                    this.props.flash
               )
          ) {
               return (
                    <FocusForm
                         doOpen={true}
                         onTheClose={this.closeFocusForm}
                         validateButtonAction={this.state.validateButtonAction}
                         identifiant={this.state.username}
                         title={this.state.title}
                         description={this.state.description}
                         fieldsToDisplay={this.state.fieldsToDisplay}
                         validateButtonLabel={this.state.validateButtonLabel}
                    />
               );
          }
     }

     render() {
          return (
               <div>
                    {this.renderFocusForm()}
                    {this.renderContent()}
                    <div className="fixed-action-btn">
                         <div
                              className="btn-floating btn-large teal"
                              onClick={() => {
                                   this.resetState();
                                   this.setState({
                                        validateButtonAction:
                                             this.props.createUser,
                                        title: "Création d'utilisateur",
                                        description:
                                             "Veuillez rentrer le nom d'utilisateur et le mot de passe d'un agent pour que celui-ci puisse accéder à l'interface dédiée.",
                                        validateButtonLabel:
                                             "Créer l'utilisateur",
                                        fieldsToDisplay: [
                                             {
                                                  label: 'Username',
                                                  id: 'username',
                                                  type: 'text',
                                                  component: CustomField,
                                             },
                                             {
                                                  label: 'Password',
                                                  id: 'password',
                                                  type: 'text',
                                                  component: CustomField,
                                             },
                                             {
                                                  label: 'Rôle',
                                                  id: 'role',
                                                  type: 'select',
                                                  component: 'select',
                                                  valueToSet: 'agent',
                                                  values: Roles,
                                             },
                                        ],
                                   });
                              }}
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
