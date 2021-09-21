//Rendering layer control (React router content)
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { reduxForm, Field } from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CustomField from '../../customs/CustomField';
import moment from 'moment';
import {
     Civility,
     MandateKind,
     Garage,
     PropertyKind,
     PropertyTransactionKind,
     PaymentKind,
} from '../../../actions/types';
import {
     getField,
     getNotairesIdToNamesObjects,
     getNotaryFieldsToDisplay,
     getSyndicFieldsToDisplay,
     getSyndicsIdToNamesObjects,
} from '../../../utils/forms';
import { withRouter } from 'react-router-dom';
import FocusForm from '../FocusForm';
class ClientRentingCase extends Component {
     state = {
          stateTriggeredValues: { files: new Set() },
     };

     constructor(props) {
          super(props);
          this.bindedGetFieldFunction = getField.bind(this);
     }

     getFocusEditConfigurationForReadOnlyObject(
          objectId,
          title,
          getFieldsToDisplayFunction
     ) {
          let focusEditConfiguration = {
               identifiants: {
                    modelInstanceId: objectId,
               },
               title,
               fieldsToDisplay: getFieldsToDisplayFunction,
          };
          return focusEditConfiguration;
     }
     renderFields(openCase) {
          const fieldsToDisplay = [
               {
                    label: 'Dossier cloturé',
                    id: 'caseClosed',
                    type: 'checkbox',
                    valueToSet:
                         openCase && openCase.caseClosed ? true : undefined,
                    component: CustomField,
                    block: 1,
                    br: true,
               },
               {
                    label: 'Porte',
                    id: 'door',
                    type: 'Text',
                    valueToSet: openCase ? openCase.door : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Etage',
                    id: 'floor',
                    type: 'number',
                    valueToSet: openCase ? openCase.floor : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Rue',
                    id: 'street',
                    type: 'text',
                    valueToSet: openCase ? openCase.street : undefined,
                    component: CustomField,
                    openBlock: true,
                    block: 1,
               },
               {
                    label: 'Code postal',
                    id: 'postalCode',
                    type: 'number',
                    valueToSet: openCase ? openCase.postalCode : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Ville',
                    id: 'city',
                    type: 'text',
                    valueToSet: openCase ? openCase.city : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Loyer Hors Charges',
                    id: 'rentingPrice',
                    type: 'number',
                    valueToSet: openCase ? openCase.rentingPrice : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Charges',
                    id: 'rentingCharges',
                    type: 'number',
                    valueToSet: openCase ? openCase.rentingCharges : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Mode de paiment du loyer',
                    id: 'paymentKind',
                    type: 'select',
                    component: CustomField,
                    valueToSet: openCase ? openCase.paymentKind : undefined,
                    valuesToSet: PaymentKind,
                    block: 2,
               },
               {
                    label: 'RIB si paiement par virement/prélèvement',
                    id: 'rib',
                    type: 'pdf',
                    component: CustomField,
                    valueToSet: openCase ? openCase.rib : undefined,
                    valuesToSet: PaymentKind,
                    block: 2,
               },
               {
                    label: 'Impayés',
                    id: 'notPayed',
                    type: 'number',
                    valueToSet: openCase ? openCase.notPayed : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Caution',
                    id: 'caution',
                    type: 'number',
                    valueToSet: openCase ? openCase.caution : undefined,
                    component: CustomField,
                    block: 2,
               },

               {
                    label: 'Type de caution',
                    id: 'cautionType',
                    type: 'select',
                    component: CustomField,
                    valueToSet: openCase ? openCase.cautionType : undefined,
                    valuesToSet: PaymentKind,
                    block: 2,
               },
               {
                    label: 'Bail',
                    id: 'bail',
                    type: 'pdf',
                    valueToSet: openCase ? openCase.bail : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Assurance propriétaire',
                    id: 'ownerInsurrance',
                    type: 'pdf',
                    valueToSet: openCase ? openCase.ownerInsurrance : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Assurance locataire',
                    id: 'renterInsurrance',
                    type: 'pdf',
                    valueToSet: openCase
                         ? openCase.renterInsurrance
                         : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: "Etat des lieux d'entrée",
                    id: 'entryForm',
                    type: 'pdf',
                    valueToSet: openCase ? openCase.entryForm : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Etat des lieux de sortie',
                    id: 'exitForm',
                    type: 'pdf',
                    valueToSet: openCase ? openCase.exitForm : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Photos du dernier état des lieux',
                    id: 'lastEntryFormImages',
                    type: 'images',
                    component: CustomField,
                    valuesToSet: openCase
                         ? openCase.lastEntryFormImages
                         : undefined,
                    block: 3,
               },
               {
                    label: 'Procédure en cours',
                    id: 'inProgressProcedure',
                    type: 'textarea',
                    valueToSet: openCase
                         ? openCase.inProgressProcedure
                         : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Réclamations',
                    id: 'reclamation',
                    type: 'textarea',
                    valueToSet: openCase ? openCase.reclamation : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Commentaire',
                    id: 'comment',
                    type: 'textarea',
                    valueToSet: openCase ? openCase.comment : undefined,
                    component: CustomField,
                    block: 3,
               },
          ];
          return <div className="row">{this.renderRow(fieldsToDisplay)}</div>;
     }

     renderRow(fieldsToDisplay) {
          let keyObject = { keyValue: 5 };
          return _.map([1, 2, 3], (i) => {
               keyObject.keyValue = keyObject.keyValue + 1;
               return (
                    <div key={i} className="col-4">
                         {this.renderCols(fieldsToDisplay, i, keyObject)}
                    </div>
               );
          });
     }

     renderCols(fieldsToDisplay, i, keyObject) {
          return _.map(
               fieldsToDisplay.filter((field) => field.block === i),
               (field) => {
                    keyObject.keyValue = keyObject.keyValue + 4;
                    return this.bindedGetFieldFunction(
                         field,
                         {
                              identifiants: this.props.client._id,
                         },
                         keyObject
                    );
               }
          );
     }

     render() {
          return (
               this.props.rentingCase && (
                    <>
                         {this.props.focusFormConfiguration && <FocusForm />}
                         <Form>
                              {this.renderFields(this.props.rentingCase)}
                              <div
                                   className="text-danger"
                                   style={{ marginBottom: '20px' }}
                              >
                                   {this.props.flash
                                        ? this.props.flash.message
                                        : ''}
                              </div>
                              <div className="flexParentRowChildren">
                                   <Button
                                        variant="warning"
                                        type="button"
                                        className="centered margin-right-15px"
                                        onClick={() => {
                                             window.location.reload();
                                        }}
                                   >
                                        Annuler les modifications
                                        <i className="material-icons separateIcon">
                                             cancel
                                        </i>
                                   </Button>
                                   <Button
                                        variant="success"
                                        className="centered margin-right-15px"
                                        onClick={() =>
                                             this.props.editAction(
                                                  this.props.history,
                                                  this.props.form,
                                                  {
                                                       modelInstanceId:
                                                            this.props
                                                                 .rentingCase
                                                                 ._id,
                                                  },
                                                  this.state
                                                       .stateTriggeredValues
                                             )
                                        }
                                   >
                                        Appliquer les modification(s)
                                        <i className="material-icons separateIcon">
                                             done
                                        </i>
                                   </Button>
                                   <Button
                                        variant="danger"
                                        className="centered margin-right-15px"
                                        onClick={() => {
                                             this.props.configureFocusForm({
                                                  validateButtonAction:
                                                       this.props.deleteAction,
                                                  identifiants: {
                                                       modelInstanceId:
                                                            this.props
                                                                 .rentingCase
                                                                 ._id,
                                                       clientId:
                                                            this.props.client
                                                                 ._id,
                                                  },
                                                  title: 'Suppression de la fiche de cette transaction',
                                                  description:
                                                       'Etes-vous sûr de vouloir supprimer la fiche?',
                                                  validateButtonLabel:
                                                       'Supprimer la fiche',
                                                  fieldsToDisplay: [],
                                             });
                                        }}
                                   >
                                        Supprimer le dossier
                                        <i className="material-icons separateIcon">
                                             delete
                                        </i>
                                   </Button>
                                   <Button
                                        variant="primary"
                                        className="centered "
                                        onClick={() => {
                                             this.props.history.push(
                                                  this.props.history.location
                                                       .pathname +
                                                       '/rentingReceipts'
                                             );
                                        }}
                                   >
                                        Voir les quittances
                                        <i className="material-icons separateIcon">
                                             description
                                        </i>
                                   </Button>
                              </div>
                         </Form>
                    </>
               )
          );
     }
}

function mapStateToProps(props) {
     return props;
}
ClientRentingCase = connect(mapStateToProps, actions)(ClientRentingCase);
export default reduxForm({
     destroyOnUnmount: false,
     form: 'caseForm',
})(withRouter(ClientRentingCase));
