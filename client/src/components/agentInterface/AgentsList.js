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
     // state = {
     //      showFocusForm: false,
     // };

     constructor(props) {
          super(props);

          this.state = {
               showFoshowFocusFormcusFormBis: false,
          };
     }
     componentDidMount() {
          this.props.fetchPage('agentsList');
          this.props.fetchUsers();
          this.closeFocusForm = this.closeFocusForm.bind(this);
          this.computeFormOpeningStatus =
               this.computeFormOpeningStatus.bind(this);
          this.backButtonTriggered = false;
          this.createUserButtonTriggered = false;
          this.username = undefined;
          this.validateButtonAction = undefined;
          this.title = undefined;
          this.description = undefined;
          this.validateButtonLabel = undefined;
          this.fieldsToDisplay = undefined;
     }

     resetState(user) {
          if (this.props.flash) {
               this.props.flash.message = false;
          }
          this.setState({ showFocusForm: true });
          this.backButtonTriggered = false;
          this.createUserButtonTriggered = false;
          if (user) {
               this.username = user.username;
          }
     }

     setUserDeletionVariables() {
          this.validateButtonAction = this.props.deleteUser;
          this.title = "Suppression d'utilisateur";
          this.description = "Etes-vous sûr de vouloir supprimer l'agent?";
          this.validateButtonLabel = "Supprimer l'utilisateur";
          this.fieldsToDisplay = [];
     }

     setUserEditionVariables(user) {
          this.validateButtonAction = this.props.editUser;

          this.title = "Edition de l'utilisateur";
          this.description =
               "Veuillez sélectionner le rôle de l'agent et un nouveau password ou laisser le vide pour qu'il ne soit pas changé.";
          this.validateButtonLabel = "Modifier l'utilisateur";
          this.fieldsToDisplay = [
               {
                    label: 'Username',
                    id: 'username',
                    type: 'text',
                    component: CustomField,
                    disabled: true,
                    valueToSet: user.username,
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
                    valueToSet: user.role,
                    values: Roles,
               },
          ];
     }

     setUserCreationVariables() {
          this.validateButtonAction = this.props.createUser;
          this.title = "Création d'utilisateur";
          this.description =
               "Veuillez rentrer le nom d'utilisateur et le mot de passe d'un agent pour que celui-ci puisse accéder à l'interface dédiée.";
          this.validateButtonLabel = "Créer l'utilisateur";
          this.fieldsToDisplay = [
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
          ];
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
                                                         <div
                                                              onClick={() => {
                                                                   this.resetState(
                                                                        user
                                                                   );
                                                                   this.setUserDeletionVariables();
                                                              }}
                                                              className="selectable secondary-content red-text"
                                                         >
                                                              <i className="material-icons">
                                                                   delete
                                                              </i>
                                                         </div>
                                                         <div
                                                              onClick={() => {
                                                                   this.resetState(
                                                                        user
                                                                   );
                                                                   this.setUserEditionVariables(
                                                                        user
                                                                   );
                                                              }}
                                                              className="selectable secondary-content teal-text"
                                                         >
                                                              <i className="material-icons">
                                                                   mode_edit
                                                              </i>
                                                         </div>
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
          this.backButtonTriggered = actionFromBackButton;
          this.createUserButtonTriggered = actionFromNewUserButton;
          this.setState({ showFocusForm: false });
     }
     computeFormOpeningStatus(showFocusForm, flash) {
          if (this.backButtonTriggered) {
               return false;
          } else if (this.createUserButtonTriggered) {
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
     renderFocusForm(showFocusForm) {
          if (this.computeFormOpeningStatus(showFocusForm, this.props.flash)) {
               return (
                    <FocusForm
                         doOpen={true}
                         onTheClose={this.closeFocusForm}
                         validateButtonAction={this.validateButtonAction}
                         identifiant={this.username}
                         title={this.title}
                         description={this.description}
                         fieldsToDisplay={this.fieldsToDisplay}
                         validateButtonLabel={this.validateButtonLabel}
                    />
               );
          }
     }

     render() {
          return (
               <div>
                    {this.renderFocusForm(this.state.showFocusForm)}
                    {this.renderContent()}
                    <div className="fixed-action-btn">
                         <div
                              className="btn-floating btn-large teal"
                              onClick={() => {
                                   this.resetState(null);
                                   this.setUserCreationVariables();
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
