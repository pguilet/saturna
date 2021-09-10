//Rendering layer control (React router content)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import FocusForm from './FocusForm';
import CustomField from '../customs/CustomField';
import { Roles } from '../../actions/types';
import FixedFloatingButton from '../customs/FixedFloatingButton';
import Table from 'react-bootstrap/Table';

class AgentsList extends Component {
     componentDidMount() {
          this.props.fetchPage('agentsList');
          this.props.fetchUsers();
     }

     renderContent() {
          var key = 0;
          return (
               <div>
                    <h4>Liste des comptes des agents</h4>
                    <Table striped bordered hover>
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
                                          var focusEditConfiguration = {
                                               validateButtonAction:
                                                    this.props.editUser,
                                               identifiant: {
                                                    _id: user._id,
                                               },
                                               title: "Edition de l'utilisateur",
                                               description:
                                                    "Veuillez sélectionner le rôle de l'agent et un nouveau password ou laisser le vide pour qu'il ne soit pas changé.",
                                               validateButtonLabel:
                                                    "Modifier l'utilisateur",
                                               fieldsToDisplay: [
                                                    {
                                                         label: 'Username',
                                                         id: 'username',
                                                         type: 'text',
                                                         component: CustomField,
                                                         disabled: true,
                                                         valueToSet:
                                                              user.username,
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
                                                         component: CustomField,
                                                         valueToSet: user.role,
                                                         valuesToSet: Roles,
                                                    },
                                               ],
                                          };
                                          return (
                                               <tr key={key + 1}>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusEditConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {user.username}
                                                         {user.googleId}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusEditConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {user.role}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusEditConfiguration
                                                              );
                                                         }}
                                                    >
                                                         <div className="inline secondary-content text-teal">
                                                              <i className="material-icons">
                                                                   mode_edit
                                                              </i>
                                                         </div>
                                                    </td>
                                                    <td>
                                                         <div
                                                              onClick={() => {
                                                                   this.props.configureFocusForm(
                                                                        {
                                                                             validateButtonAction:
                                                                                  this
                                                                                       .props
                                                                                       .deleteUser,
                                                                             identifiant:
                                                                                  {
                                                                                       _id: user._id,
                                                                                       username:
                                                                                            user.username,
                                                                                  },
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
                                                              className="inline selectable secondary-content text-danger"
                                                         >
                                                              <i className="material-icons">
                                                                   delete
                                                              </i>
                                                         </div>
                                                    </td>
                                               </tr>
                                          );
                                     })
                                   : null}
                         </tbody>
                    </Table>
               </div>
          );
     }

     render() {
          return (
               <div>
                    {this.props.focusFormConfiguration && <FocusForm />}
                    {this.renderContent()}
                    <FixedFloatingButton
                         onClick={() => {
                              this.props.configureFocusForm({
                                   validateButtonAction: this.props.createUser,
                                   title: "Création d'utilisateur",
                                   description:
                                        "Veuillez rentrer le nom d'utilisateur et le mot de passe d'un agent pour que celui-ci puisse accéder à l'interface dédiée.",
                                   validateButtonLabel: "Créer l'utilisateur",
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
                                             component: CustomField,
                                             valueToSet: 'agent',
                                             valuesToSet: Roles,
                                        },
                                   ],
                              });
                         }}
                    />
               </div>
          );
     }
}
function mapStateToProps({ users, flash, focusFormConfiguration }) {
     return { users, flash, focusFormConfiguration };
}

export default connect(mapStateToProps, actions)(AgentsList);
