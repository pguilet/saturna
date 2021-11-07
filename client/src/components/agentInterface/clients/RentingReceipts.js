import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import FocusForm from '../FocusForm';
import FixedFloatingButton from '../../customs/FixedFloatingButton';
import CustomField from '../../customs/CustomField';
import _ from 'lodash';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../../../utils/routing';

class RentingReceipts extends Component {
     componentDidMount() {
          if (!this.props.rentingCase) {
               this.props.fetchRentingCase(
                    this.props.params.clientId,
                    this.props.params.caseId
               );
          }
     }

     renderContent() {
          return (
               <>
                    <h4>Quittances de loyer</h4>
                    <Table striped bordered hover>
                         <thead>
                              <tr>
                                   <th>Date</th>
                                   <th>Envoyé</th>
                                   <th>Actions</th>
                              </tr>
                         </thead>
                         <tbody>
                              {this.props.rentingCase && this.renderReceipts()}
                         </tbody>
                    </Table>
               </>
          );
     }

     renderReceipts() {
          return _.map(
               _.sortBy(this.props.rentingCase.rentReceipts, (receipt) => {
                    return receipt.date;
               }),
               (receipt) => {
                    return (
                         <React.Fragment key={receipt._id}>
                              <tr>
                                   <td>
                                        {moment(receipt.date).format(
                                             'DD-MM-YYYY'
                                        )}
                                   </td>
                                   <td>{receipt.sent ? 'Oui' : 'Non'}</td>
                                   <td>
                                        <div
                                             onClick={() => {
                                                  this.props.configureFocusForm(
                                                       {
                                                            validateButtonAction:
                                                                 this.props
                                                                      .deleteRentingReceipt,
                                                            identifiants: {
                                                                 modelInstanceId:
                                                                      this.props
                                                                           .rentingCase
                                                                           ._id,
                                                                 receiptIdToDelete:
                                                                      receipt._id,
                                                            },
                                                            title: 'Suppression de la quittance',
                                                            description:
                                                                 'Etes-vous sûr de vouloir supprimer la quittance?',
                                                            validateButtonLabel:
                                                                 'Supprimer la quittance',
                                                            fieldsToDisplay: [],
                                                       }
                                                  );
                                             }}
                                             className="inline selectable secondary-content text-danger"
                                        >
                                             <i className="material-icons">
                                                  delete
                                             </i>
                                        </div>
                                        <div
                                             className="inline selectable secondary-content text-success"
                                             title="Envoyer"
                                             onClick={async () => {
                                                  this.props.sendRentReceipt({
                                                       identifiants: {
                                                            modelInstanceId:
                                                                 this.props
                                                                      .match
                                                                      .params
                                                                      .caseId,
                                                            clientId:
                                                                 this.props
                                                                      .match
                                                                      .params
                                                                      .clientId,
                                                            receiptIdToSend:
                                                                 receipt._id,
                                                       },
                                                  });
                                             }}
                                        >
                                             <i className="material-icons">
                                                  send
                                             </i>
                                        </div>
                                   </td>
                              </tr>
                         </React.Fragment>
                    );
               }
          );
     }

     render() {
          return (
               <>
                    {this.props.rentingCase &&
                         this.props.focusFormConfiguration && <FocusForm />}
                    {this.renderContent()}
                    <div
                         className="text-danger"
                         style={{ marginBottom: '20px' }}
                    >
                         {this.props.flash ? this.props.flash.message : ''}
                    </div>
                    <Button
                         variant="warning"
                         type="button"
                         className="centered margin-right-15px"
                         onClick={() => {
                              let pathArray =
                                   this.props.location.pathname.split('/');
                              this.props.history(
                                   pathArray
                                        .slice(0, pathArray.length - 1)
                                        .join('/'),
                                   { replace: false }
                              );
                         }}
                    >
                         Retour au dossier de location
                         <i className="material-icons separateIcon">cancel</i>
                    </Button>
                    <FixedFloatingButton
                         onClick={() => {
                              this.props.configureFocusForm({
                                   validateButtonAction:
                                        this.props.generateRentingReceipt,
                                   identifiants: {
                                        modelInstanceId:
                                             this.props.params.caseId,
                                        clientId: this.props.params.clientId,
                                   },
                                   title: "Création d'une nouvelle quittance de loyer",
                                   description:
                                        "Formulaire de création  d'une nouvelle quittance de loyer.",
                                   validateButtonLabel: 'Générer la quittance',
                                   fieldsToDisplay: [
                                        {
                                             label: "Date de début pour prorata d'entrée",
                                             id: 'startProrata',
                                             type: 'datePicker',
                                             component: CustomField,
                                        },
                                        {
                                             label: 'Date de fin pour prorata de sortie',
                                             id: 'endProrata',
                                             type: 'datePicker',
                                             component: CustomField,
                                        },

                                        {
                                             label: 'Sélection du mois de génération de la quittance',
                                             id: 'month',
                                             type: 'datePicker',
                                             component: CustomField,
                                        },
                                   ],
                              });
                         }}
                    />
               </>
          );
     }
}
function mapStateToProps({
     homeAds,
     flash,
     focusFormConfiguration,
     rentingCase,
     generateRentingReceipt,
     history,
}) {
     return {
          homeAds,
          flash,
          focusFormConfiguration,
          rentingCase,
          generateRentingReceipt,
          history,
     };
}

export default connect(mapStateToProps, actions)(withRouter(RentingReceipts));
