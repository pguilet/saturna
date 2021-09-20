import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import FocusForm from '../FocusForm';
import { Roles } from '../../../actions/types';
import FixedFloatingButton from '../../customs/FixedFloatingButton';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
class ClientRentingCases extends Component {
     openOpenedRentingCaseRecord(theCase) {
          this.props.openRentingCase(
               this.props.history,
               this.props.client,
               theCase,
               this.props.isClosedCase
          );
     }

     renderOpenRecordTableAction(theCase, value, isDate) {
          return (
               <td
                    className="selectable"
                    onClick={() => {
                         this.openOpenedRentingCaseRecord(theCase);
                    }}
               >
                    {isDate ? moment(value).format('DD/MM/YYYY') : value}
               </td>
          );
     }

     renderContent() {
          var key = 0;
          return (
               <>
                    <h4>Liste des dossiers en cours</h4>
                    <Table striped bordered hover>
                         <thead>
                              <tr>
                                   <th>Rue</th>
                                   <th>Code postal</th>
                                   <th>Ville</th>
                                   <th>Dette</th>
                                   <th>Réclamation</th>
                                   <th>Procédures en cours</th>
                                   <th>Type de paiement</th>
                              </tr>
                         </thead>
                         <tbody>
                              {this.props.rentingCases &&
                              this.props.rentingCases.length > 0
                                   ? this.props.rentingCases.map((theCase) => {
                                          key += 4;
                                          return (
                                               <tr key={key + 1}>
                                                    {this.renderOpenRecordTableAction(
                                                         theCase,
                                                         theCase.street
                                                    )}
                                                    {this.renderOpenRecordTableAction(
                                                         theCase,
                                                         theCase.postalCode
                                                    )}
                                                    {this.renderOpenRecordTableAction(
                                                         theCase,
                                                         theCase.city
                                                    )}
                                                    {this.renderOpenRecordTableAction(
                                                         theCase,
                                                         theCase.notPayed
                                                    )}
                                                    {this.renderOpenRecordTableAction(
                                                         theCase,
                                                         theCase.reclamation
                                                    )}
                                                    {this.renderOpenRecordTableAction(
                                                         theCase,
                                                         theCase.inProgressProcedure
                                                    )}
                                                    {this.renderOpenRecordTableAction(
                                                         theCase,
                                                         theCase.paymentKind
                                                    )}
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.openOpenedCaseRecord(
                                                                   theCase
                                                              );
                                                         }}
                                                    >
                                                         <div className="inline secondary-content text-teal">
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
                                                                                                 .deleteAction,
                                                                                       identifiants:
                                                                                            {
                                                                                                 modelInstanceId:
                                                                                                      theCase._id,
                                                                                                 clientId:
                                                                                                      this
                                                                                                           .props
                                                                                                           .client
                                                                                                           ._id,
                                                                                            },
                                                                                       title: 'Suppression de la fiche de gestion locative',
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
               </>
          );
     }

     render() {
          return (
               <div>
                    {this.props.focusFormConfiguration && <FocusForm />}
                    {this.renderContent()}
                    {!this.props.noCreateButton && (
                         <FixedFloatingButton
                              onClick={() => {
                                   this.props.addAction(
                                        this.props.history,
                                        null,
                                        { _user: this.props.client._id },
                                        null
                                   );
                              }}
                         />
                    )}
               </div>
          );
     }
}

function mapStateToProps(props) {
     return props;
}
export default connect(
     mapStateToProps,
     actions
)(withRouter(ClientRentingCases));
