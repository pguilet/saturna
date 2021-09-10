//Rendering layer control (React router content)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import FocusForm from './FocusForm';
import { Roles } from '../../actions/types';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class Search extends Component {
     componentDidMount() {
          this.props.fetchPage('clients');
     }

     openClientRecord(clientId) {
          this.props.openClient(this.props.history, clientId);
     }

     renderOpenRecordTableAction(client, value, isDate) {
          return (
               <td
                    className="selectable"
                    onClick={() => {
                         this.openClientRecord(client._id);
                    }}
               >
                    s{isDate ? moment(value).format('L') : value}
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
                                                                             this.props.configureFocusForm(
                                                                                  {
                                                                                       validateButtonAction:
                                                                                            this
                                                                                                 .props
                                                                                                 .deleteClient,
                                                                                       identifiant:
                                                                                            {
                                                                                                 _id: client._id,
                                                                                            },
                                                                                       title: 'Suppression de la fiche du client',
                                                                                       description:
                                                                                            'Etes-vous sûr de vouloir supprimer la fiche?',
                                                                                       validateButtonLabel:
                                                                                            'Supprimer la fiche',
                                                                                       fieldsToDisplay:
                                                                                            [],
                                                                                  }
                                                                             );
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

     render() {
          return (
               <div>
                    {this.props.focusFormConfiguration && <FocusForm />}
                    {this.renderContent()}
               </div>
          );
     }
}
function mapStateToProps({ clients, flash, auth, focusFormConfiguration }) {
     return { clients, flash, auth, focusFormConfiguration };
}

export default connect(mapStateToProps, actions)(withRouter(Search));
