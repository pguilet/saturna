import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { reduxForm } from 'redux-form';
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
} from '../../../actions/types';
import {
     getField,
     getNotairesIdToNamesObjects,
     getNotaryFieldsToDisplay,
     getSyndicFieldsToDisplay,
     getSyndicsIdToNamesObjects,
     getUserIdToNamesObjects,
} from '../../../utils/forms';
import { withRouter } from '../../../utils/routing';
import FocusForm from '../FocusForm';
class ClientCase extends Component {
     state = {
          stateTriggeredValues: { files: new Set() },
          notairesIdToNamesObjects: null,
          syndicsIdToNamesObjects: null,
          userIdToNamesObjects: null,
     };
     componentDidMount() {
          this.updateNotaries();
     }

     updateNotaries() {
          getNotairesIdToNamesObjects().then((result) =>
               this.setState({
                    notairesIdToNamesObjects: result,
               })
          );
          getSyndicsIdToNamesObjects().then((result) =>
               this.setState({
                    syndicsIdToNamesObjects: result,
               })
          );
          getUserIdToNamesObjects().then((result) =>
               this.setState({
                    userIdToNamesObjects: result,
               })
          );
     }

     constructor(props) {
          super(props);
          this.bindedGetFieldFunction = getField.bind(this);
          this.updateNotaries = this.updateNotaries.bind(this);
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
                    label: 'Dossier clotur??',
                    id: 'caseClosed',
                    type: 'checkbox',
                    valueToSet:
                         openCase && openCase.caseClosed ? true : undefined,
                    component: CustomField,
                    block: 1,
                    br: true,
               },
               {
                    label: 'Mandat',
                    id: 'mandateKind',
                    type: 'select',
                    component: CustomField,
                    valueToSet: openCase ? openCase.mandateKind : undefined,
                    valuesToSet: MandateKind,
                    block: 1,
               },
               {
                    label: 'Type de bien',
                    id: 'propertyKind',
                    type: 'select',
                    component: CustomField,
                    valueToSet: openCase ? openCase.propertyKind : undefined,
                    valuesToSet: PropertyKind,
                    block: 1,
               },
               {
                    label: 'Type de transaction',
                    id: 'propertyTransactionKind',
                    type: 'select',
                    component: CustomField,
                    valueToSet: openCase
                         ? openCase.propertyTransactionKind
                         : undefined,
                    valuesToSet: PropertyTransactionKind,
                    block: 1,
               },
               {
                    label: 'Date de signature notaire',
                    id: 'transactionDate',
                    type: 'datePicker',
                    valueToSet:
                         openCase && openCase.transactionDate
                              ? moment(openCase.transactionDate).format(
                                     'YYYY-MM-DD'
                                )
                              : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Photos du bien',
                    id: 'propertyImages',
                    type: 'images',
                    component: CustomField,
                    valuesToSet: openCase ? openCase.propertyImages : undefined,
                    block: 1,
               },
               {
                    label: 'Apport personnel',
                    id: 'personalContribution',
                    type: 'number',
                    valueToSet: openCase
                         ? openCase.personalContribution
                         : undefined,
                    component: CustomField,
                    block: 1,
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
                    label: 'Orientation',
                    id: 'propertyOrientation',
                    type: 'text',
                    valueToSet: openCase
                         ? openCase.propertyOrientation
                         : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Superficie',
                    id: 'propertySquareRoot',
                    type: 'number',
                    valueToSet: openCase
                         ? openCase.propertySquareRoot
                         : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Contact agent',
                    id: 'contactUser',
                    type: 'selectWithDetailViewer',
                    valueToSet:
                         openCase && openCase.contactUser
                              ? openCase.contactUser._id
                              : undefined,
                    valuesToSet: this.state.userIdToNamesObjects,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Estimation agent',
                    id: 'estimationUser',
                    type: 'selectWithDetailViewer',
                    valueToSet:
                         openCase && openCase.estimationUser
                              ? openCase.estimationUser._id
                              : undefined,
                    valuesToSet: this.state.userIdToNamesObjects,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Mandat agent',
                    id: 'mandateUser',
                    type: 'selectWithDetailViewer',
                    valueToSet:
                         openCase && openCase.mandateUser
                              ? openCase.mandateUser._id
                              : undefined,
                    valuesToSet: this.state.userIdToNamesObjects,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Vente agent',
                    id: 'sellingUser',
                    type: 'selectWithDetailViewer',
                    valueToSet:
                         openCase && openCase.sellingUser
                              ? openCase.sellingUser._id
                              : undefined,
                    valuesToSet: this.state.userIdToNamesObjects,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Loi carrez',
                    id: 'carrezLawPdf',
                    type: 'pdf',
                    valueToSet: openCase ? openCase.carrezLawPdf : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Nombre de pi??ces',
                    id: 'roomNumber',
                    type: 'number',
                    valueToSet: openCase ? openCase.roomNumber : undefined,
                    component: CustomField,
                    block: 2,
               },

               {
                    label: 'Jardin en m??',
                    id: 'gardenSquare',
                    type: 'Number',
                    component: CustomField,
                    valueToSet: openCase ? openCase.gardenSquare : undefined,
                    block: 2,
               },
               {
                    label: 'Balcon',
                    id: 'balcony',
                    type: 'checkbox',
                    valueToSet: openCase && openCase.balcony ? true : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Cave',
                    id: 'cave',
                    type: 'checkbox',
                    valueToSet: openCase && openCase.cave ? true : undefined,
                    component: CustomField,
                    br: true,
                    block: 2,
               },
               {
                    label: 'Garage',
                    id: 'garage',
                    type: 'select',
                    component: CustomField,
                    valueToSet: openCase ? openCase.garage : undefined,
                    valuesToSet: Garage,
                    block: 2,
               },
               {
                    label: 'Points positifs du quartier',
                    id: 'strongPointArea',
                    type: 'textarea',
                    valueToSet: openCase ? openCase.strongPointArea : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Points n??gatifs du quartier',
                    id: 'weakPointArea',
                    type: 'textarea',
                    valueToSet: openCase ? openCase.weakPointArea : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Travaux ?? pr??voir',
                    id: 'worksToBeDone',
                    type: 'textarea',
                    valueToSet: openCase ? openCase.worksToBeDone : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Travaux r??aliser',
                    id: 'realizedWorks',
                    type: 'textarea',
                    valueToSet: openCase ? openCase.realizedWorks : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Derniers travaux effectu??s',
                    id: 'lastWorksDone',
                    type: 'textarea',
                    valueToSet: openCase ? openCase.lastWorksDone : undefined,
                    component: CustomField,
                    block: 2,
               },

               {
                    label: 'Estimation',
                    id: 'estimation',
                    type: 'Number',
                    valueToSet: openCase ? openCase.estimation : undefined,
                    component: CustomField,
                    block: 3,
               },

               {
                    label: "Photos de l'estimation",
                    id: 'estimationImages',
                    type: 'images',
                    component: CustomField,
                    valuesToSet: openCase
                         ? openCase.estimationImages
                         : undefined,
                    block: 3,
               },
               {
                    label: "Commentaires sur l'estimation",
                    id: 'estimationComment',
                    type: 'textarea',
                    valueToSet: openCase
                         ? openCase.estimationComment
                         : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: "Cr??dit immobilier de l'acheteur",
                    id: 'mortGageContractPdf',
                    type: 'pdf',
                    valueToSet: openCase
                         ? openCase.mortGageContractPdf
                         : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Prix du bien',
                    id: 'transactionPrice',
                    type: 'Number',
                    valueToSet: openCase
                         ? openCase.transactionPrice
                         : undefined,
                    component: CustomField,
                    block: 3,
               },

               {
                    label: 'Dernier prix du bien',
                    id: 'lastPropertyPrice',
                    type: 'Number',
                    valueToSet: openCase
                         ? openCase.lastPropertyPrice
                         : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Compromis',
                    id: 'compromisPdf',
                    type: 'pdf',
                    valueToSet: openCase ? openCase.compromisPdf : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Diagnostiques',
                    id: 'diagnosticPdf',
                    type: 'pdf',
                    valueToSet: openCase ? openCase.diagnosticPdf : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Pr?? ??tat dat??',
                    id: 'preEtatDatePdf',
                    type: 'pdf',
                    valueToSet: openCase ? openCase.preEtatDatePdf : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Etat dat??',
                    id: 'etatDatePdf',
                    type: 'pdf',
                    valueToSet: openCase ? openCase.etatDatePdf : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Appel de fond',
                    id: 'appelDeFondPdf',
                    type: 'pdf',
                    valueToSet: openCase ? openCase.appelDeFondPdf : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Taxe fonci??re pdf',
                    id: 'propertyTaxPdf',
                    type: 'pdf',
                    valueToSet: openCase ? openCase.propertyTaxPdf : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Taxe fonci??re',
                    id: 'propertyTax',
                    type: 'number',
                    valueToSet: openCase ? openCase.propertyTax : undefined,
                    component: CustomField,
                    block: 3,
               },
               {
                    label: 'Notaire vendeur',
                    id: 'notaryVendor',
                    type: 'selectWithDetailViewer',
                    valueToSet:
                         openCase && openCase.notaryVendor
                              ? openCase.notaryVendor._id
                              : undefined,
                    valuesToSet: this.state.notairesIdToNamesObjects,
                    component: CustomField,
                    viewDetailAction: (notaryId) => {
                         this.props.configureFocusForm(
                              this.getFocusEditConfigurationForReadOnlyObject(
                                   notaryId,
                                   'Informations du notaire vendeur',
                                   getNotaryFieldsToDisplay
                              )
                         );
                    },
                    block: 3,
               },
               {
                    label: 'Notaire acheteur',
                    id: 'notaryBuyer',
                    type: 'selectWithDetailViewer',
                    valueToSet:
                         openCase && openCase.notaryBuyer
                              ? openCase.notaryBuyer._id
                              : undefined,
                    valuesToSet: this.state.notairesIdToNamesObjects,
                    component: CustomField,
                    viewDetailAction: (notaryId) => {
                         this.props.configureFocusForm(
                              this.getFocusEditConfigurationForReadOnlyObject(
                                   notaryId,
                                   'Informations du notaire acheteur',
                                   getNotaryFieldsToDisplay
                              )
                         );
                    },
                    block: 3,
               },
               {
                    label: 'Syndic',
                    id: 'syndic',
                    type: 'selectWithDetailViewer',
                    valueToSet:
                         openCase && openCase.syndic
                              ? openCase.syndic._id
                              : undefined,
                    valuesToSet: this.state.syndicsIdToNamesObjects,
                    component: CustomField,
                    viewDetailAction: (syndicId) => {
                         this.props.configureFocusForm(
                              this.getFocusEditConfigurationForReadOnlyObject(
                                   syndicId,
                                   'Informations du  syndic',
                                   getSyndicFieldsToDisplay
                              )
                         );
                    },
                    block: 3,
               },
               {
                    label: "Coordonn??es de l'autre partie",
                    block: 4,
               },
               {
                    label: 'Civilit??',
                    id: 'civility',
                    type: 'select',
                    component: CustomField,
                    valueToSet: openCase ? openCase.civility : undefined,
                    valuesToSet: Civility,
                    block: 4,
               },
               {
                    label: 'Nom',
                    id: 'surname',
                    type: 'text',
                    valueToSet: openCase ? openCase.surname : undefined,
                    component: CustomField,
                    block: 4,
               },
               {
                    label: 'Nom de jeune fille',
                    id: 'womenSurname',
                    type: 'text',
                    valueToSet: openCase ? openCase.womenSurname : undefined,
                    component: CustomField,
                    block: 4,
               },
               {
                    label: 'Pr??nom',
                    id: 'name',
                    type: 'text',
                    valueToSet: openCase ? openCase.name : undefined,
                    component: CustomField,
                    block: 4,
               },
               {
                    label: 'Pr??nom 2',
                    id: 'name2',
                    type: 'text',
                    valueToSet: openCase ? openCase.name2 : undefined,
                    component: CustomField,
                    block: 4,
               },
               {
                    label: 'Pr??nom 3',
                    id: 'name3',
                    type: 'text',
                    valueToSet: openCase ? openCase.name3 : undefined,
                    component: CustomField,
                    block: 4,
               },
               {
                    label: 'Date de naissance',
                    id: 'birthday',
                    type: 'datePicker',
                    valueToSet:
                         openCase && openCase.birthday
                              ? moment(openCase.birthday).format('YYYY-MM-DD')
                              : undefined,
                    component: CustomField,
                    block: 4,
               },
               {
                    label: 'Rue',
                    id: 'streetOther',
                    type: 'text',
                    valueToSet: openCase ? openCase.streetOther : undefined,
                    component: CustomField,
                    openBlock: true,
                    block: 4,
               },
               {
                    label: 'Code postal',
                    id: 'postalCodeOther',
                    type: 'number',
                    valueToSet: openCase ? openCase.postalCodeOther : undefined,
                    component: CustomField,
                    block: 4,
               },
               {
                    label: 'Ville',
                    id: 'cityOther',
                    type: 'text',
                    valueToSet: openCase ? openCase.cityOther : undefined,
                    component: CustomField,
                    block: 4,
               },
               {
                    label: 'Num tel',
                    id: 'phoneNumber',
                    type: 'text',
                    valueToSet: openCase ? openCase.phoneNumber : undefined,
                    component: CustomField,
                    block: 4,
               },
               {
                    label: 'Email',
                    id: 'email',
                    type: 'text',
                    valueToSet: openCase ? openCase.email : undefined,
                    component: CustomField,
                    block: 4,
               },
               {
                    label: 'Commentaire',
                    id: 'comment',
                    type: 'textarea',
                    component: CustomField,
                    valueToSet: openCase ? openCase.comment : undefined,
                    block: 4,
               },
          ];
          return <div className="row">{this.renderRow(fieldsToDisplay)}</div>;
     }

     renderRow(fieldsToDisplay) {
          let keyObject = { keyValue: 5 };
          return _.map([1, 2, 3, 4], (i) => {
               keyObject.keyValue = keyObject.keyValue + 1;
               return (
                    <div key={i} className="col-3">
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
               this.props.propertyCase &&
               this.state.notairesIdToNamesObjects !== null &&
               this.state.syndicsIdToNamesObjects !== null &&
               this.state.userIdToNamesObjects !== null && (
                    <>
                         {this.props.focusFormConfiguration && <FocusForm />}
                         <Form>
                              {this.renderFields(this.props.propertyCase)}
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
                                                                 .propertyCase
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
                                        className="centered"
                                        onClick={() => {
                                             this.props.configureFocusForm({
                                                  validateButtonAction:
                                                       this.props.deleteAction,
                                                  identifiants: {
                                                       modelInstanceId:
                                                            this.props
                                                                 .propertyCase
                                                                 ._id,
                                                       clientId:
                                                            this.props.client
                                                                 ._id,
                                                  },
                                                  title: 'Suppression de la fiche de cette transaction',
                                                  description:
                                                       'Etes-vous s??r de vouloir supprimer la fiche?',
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
ClientCase = connect(mapStateToProps, actions)(ClientCase);
export default reduxForm({
     destroyOnUnmount: false,
     form: 'caseForm',
})(withRouter(ClientCase));
