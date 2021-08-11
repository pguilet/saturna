//Rendering layer control (React router content)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import FocusForm from './FocusForm';
import CustomField from '../customs/CustomField';
import { Roles } from '../../actions/types';
import FixedFloatingButton from '../customs/FixedFloatingButton';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class Search extends Component {
     state = {
          showFocusForm: false,
     };

     constructor(props) {
          super(props);

          this.state = {
               showFocusForm: false,
          };
     }
     componentDidMount() {
          this.props.fetchPage('clients');
          this.closeFocusForm = this.closeFocusForm.bind(this);
          this.computeFormOpeningStatus =
               this.computeFormOpeningStatus.bind(this);
          this.backButtonTriggered = false;
          this.createUserButtonTriggered = false;
          this.name = undefined;
          this.surname = undefined;
          this.birthday = undefined;
          this.validateButtonAction = undefined;
          this.title = undefined;
          this.description = undefined;
          this.validateButtonLabel = undefined;
          this.fieldsToDisplay = undefined;
     }

     resetState(client, resetShowFocusForm) {
          if (this.props.flash) {
               this.props.flash.message = false;
          }
          if (resetShowFocusForm) {
               this.setState({ showFocusForm: true });
          }
          this.backButtonTriggered = false;
          this.createUserButtonTriggered = false;
          if (client) {
               this.name = client.name;
               this.surname = client.surname;
               this.birthday = client.birthday;
          }
     }

     setClientDeletionVariables() {
          this.validateButtonAction = this.props.deleteClient;
          this.title = 'Suppression de la fiche du client';
          this.description = 'Etes-vous sûr de vouloir supprimer la fiche?';
          this.validateButtonLabel = 'Supprimer la fiche';
          this.fieldsToDisplay = [];
     }

     setClientCreationVariables() {
          this.validateButtonAction = this.props.createClient;
          this.title = "Création d'une nouvelle fiche client";
          this.description =
               "Veuillez rentrer les informations minimum requises permettant d'identifier le client.";
          this.validateButtonLabel = 'Créer la fiche';
          this.fieldsToDisplay = [
               {
                    label: 'Nom',
                    id: 'surname',
                    type: 'text',
                    component: CustomField,
               },
               {
                    label: 'Prénom',
                    id: 'name',
                    type: 'text',
                    component: CustomField,
               },
               {
                    label: 'Date de naissance',
                    id: 'birthday',
                    type: 'datePicker',
                    component: CustomField,
               },
          ];
     }
     openClientRecord(client) {
          this.props.history.push('/client/' + client._id);
     }

     renderOpenRecordTableAction(client, value, isDate) {
          return (
               <td
                    className="selectable"
                    onClick={() => {
                         this.resetState(client);
                         this.openClientRecord(client);
                    }}
               >
                    {isDate ? moment(value).format('L') : value}
               </td>
          );
     }

     renderContent() {
          var key = 0;
          return (
               <div>
                    <h4>Liste des clients</h4>
                    <Table striped bordered hover>
                         <thead>
                              <tr>
                                   <th>Nom</th>
                                   <th>Prénom</th>
                                   <th>Date de naissance</th>
                              </tr>
                         </thead>
                         <tbody>
                              {this.props.clients
                                   ? this.props.clients.map((client) => {
                                          key += 4;
                                          return (
                                               <tr key={key + 1}>
                                                    {this.renderOpenRecordTableAction(
                                                         client,
                                                         client.surname
                                                    )}
                                                    {this.renderOpenRecordTableAction(
                                                         client,
                                                         client.name
                                                    )}
                                                    {this.renderOpenRecordTableAction(
                                                         client,
                                                         client.birthday,
                                                         true
                                                    )}
                                                    <td>
                                                         <div
                                                              onClick={() => {
                                                                   this.resetState(
                                                                        client
                                                                   );
                                                                   this.openClientRecord(
                                                                        client
                                                                   );
                                                              }}
                                                              className="selectable inline secondary-content text-teal"
                                                         >
                                                              <i className="material-icons">
                                                                   visibility
                                                              </i>
                                                         </div>
                                                    </td>
                                                    <td>
                                                         {this.props.auth &&
                                                              this.props.auth
                                                                   .role ===
                                                                   Roles.ADMIN && (
                                                                   <div
                                                                        onClick={() => {
                                                                             this.resetState(
                                                                                  client,
                                                                                  true
                                                                             );
                                                                             this.setClientDeletionVariables();
                                                                        }}
                                                                        className="selectable inline secondary-content text-danger"
                                                                   >
                                                                        <i className="material-icons">
                                                                             delete
                                                                        </i>
                                                                   </div>
                                                              )}
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
                         identifiant={{
                              name: this.name,
                              surname: this.surname,
                              birthday: this.birthday,
                         }}
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
                    <FixedFloatingButton
                         onClick={() => {
                              this.resetState(null, true);
                              this.setClientCreationVariables();
                         }}
                    />
               </div>
          );
     }
}
function mapStateToProps({ clients, flash, auth }) {
     return { clients, flash, auth };
}

export default connect(mapStateToProps, actions)(withRouter(Search));
