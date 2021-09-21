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
import { FamilySituation, Civility } from '../../../actions/types';
import { withRouter } from 'react-router-dom';
import { getField } from '../../../utils/forms';
import FocusForm from '../FocusForm';

class ClientProfile extends Component {
     state = {
          stateTriggeredValues: { files: new Set() },
     };

     componentDidMount() {
          this.clientId = this.props.client._id;
          this.props.clearFlashMessage();
          this.props.fetchOpenCases(this.props.client._id); //avoid to show previous open cases of other client
     }
     constructor(props) {
          super(props);
          this.bindedGetFieldFunction = getField.bind(this);
     }
     renderFields(client) {
          const fieldsToDisplay = [
               {
                    label: 'Civilité',
                    id: 'civility',
                    type: 'select',
                    component: CustomField,
                    valueToSet: client ? client.civility : undefined,
                    valuesToSet: Civility,
                    block: 1,
               },
               {
                    label: 'Nom',
                    id: 'surname',
                    type: 'text',
                    valueToSet: client ? client.surname : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Nom de jeune fille',
                    id: 'womenSurname',
                    type: 'text',
                    valueToSet: client ? client.womenSurname : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Prénom',
                    id: 'name',
                    type: 'text',
                    valueToSet: client ? client.name : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Prénom 2',
                    id: 'name2',
                    type: 'text',
                    valueToSet: client ? client.name2 : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Prénom 3',
                    id: 'name3',
                    type: 'text',
                    valueToSet: client ? client.name3 : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Date de naissance',
                    id: 'birthday',
                    type: 'datePicker',
                    valueToSet:
                         client && client.birthday
                              ? moment(client.birthday).format('YYYY-MM-DD')
                              : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: "Nombre d'enfants",
                    id: 'childNumber',
                    type: 'number',
                    valueToSet: client ? client.childNumber : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'Situation familiale',
                    id: 'familySituation',
                    type: 'select',
                    component: CustomField,
                    valueToSet: client ? client.familySituation : undefined,
                    valuesToSet: FamilySituation,
                    block: 1,
               },
               {
                    label: 'En recherche de biens à louer',
                    id: 'seekRenting',
                    type: 'checkbox',
                    valueToSet: client && client.seekRenting ? true : undefined,
                    component: CustomField,
                    block: 1,
               },
               {
                    label: 'En recherche de biens à acheter',
                    id: 'seekBuying',
                    type: 'checkbox',
                    valueToSet: client && client.seekBuying ? true : undefined,
                    component: CustomField,
                    block: 1,
                    br: true,
                    closeBlock: true,
               },
               {
                    label: 'Critères de recherche',
                    id: 'searchCriteria',
                    type: 'textarea',
                    component: CustomField,
                    valueToSet: client ? client.searchCriteria : undefined,
                    block: 1,
               },
               {
                    label: 'Rue',
                    id: 'street',
                    type: 'text',
                    valueToSet: client ? client.street : undefined,
                    component: CustomField,
                    openBlock: true,
                    block: 2,
               },
               {
                    label: 'Code postal',
                    id: 'postalCode',
                    type: 'number',
                    valueToSet: client ? client.postalCode : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Ville',
                    id: 'city',
                    type: 'text',
                    valueToSet: client ? client.city : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Emploi',
                    id: 'job',
                    type: 'text',
                    valueToSet: client ? client.job : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Salaire',
                    id: 'salary',
                    type: 'number',
                    valueToSet: client ? client.salary : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Num tel',
                    id: 'phoneNumber',
                    type: 'text',
                    valueToSet: client ? client.phoneNumber : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Email',
                    id: 'email',
                    type: 'text',
                    valueToSet: client ? client.email : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Souscription newsletter',
                    id: 'newsletterSuscribing',
                    type: 'checkbox',
                    valueToSet:
                         client && client.newsletterSuscribing
                              ? true
                              : undefined,
                    component: CustomField,
                    br: true,
                    block: 2,
               },
               {
                    extraLabel: 'Profils',
                    label: 'Investisseur',
                    id: 'profilInvest',
                    type: 'checkbox',
                    valueToSet:
                         client && client.profilInvest ? true : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Locataire',
                    id: 'profilRent',
                    type: 'checkbox',
                    valueToSet: client && client.profilRent ? true : undefined,
                    component: CustomField,
                    block: 2,
               },
               {
                    label: 'Propriétaire',
                    id: 'profilOwner',
                    type: 'checkbox',
                    valueToSet: client && client.profilOwner ? true : undefined,
                    component: CustomField,
                    br: true,
                    closeBlock: true,
                    block: 2,
               },
               {
                    label: 'Total loyer ou crédit par mois',
                    id: 'propertyDebt',
                    type: 'number',
                    component: CustomField,
                    valueToSet: client ? client.propertyDebt : undefined,
                    block: 2,
               },
               {
                    label: 'Commentaire',
                    id: 'comment',
                    type: 'textarea',
                    component: CustomField,
                    valueToSet: client ? client.comment : undefined,
                    block: 2,
               },
          ];
          return <div className="row">{this.renderRow(fieldsToDisplay)}</div>;
     }

     renderRow(fieldsToDisplay) {
          let keyObject = { keyValue: 5 };
          return _.map([1, 2, 3, 4], (i) => {
               keyObject.keyValue = keyObject.keyValue + 1;
               return (
                    <div key={i} className="col-6">
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
                              identifiants: { parentId: this.props.client._id },
                         },
                         keyObject
                    );
               }
          );
     }

     render() {
          return (
               this.props.client && (
                    <>
                         {this.props.focusFormConfiguration && <FocusForm />}
                         <Form>
                              {this.renderFields(this.props.client)}
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
                                             this.props.editClientProfile(
                                                  this.props.history,
                                                  this.props.form,
                                                  {
                                                       modelInstanceId:
                                                            this.props.client
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
                                                       this.props.deleteClient,
                                                  identifiants: {
                                                       modelInstanceId:
                                                            this.props.client
                                                                 ._id,
                                                  },
                                                  title: 'Suppression de la fiche du client',
                                                  description:
                                                       'Etes-vous sûr de vouloir supprimer la fiche?',
                                                  validateButtonLabel:
                                                       'Supprimer la fiche',
                                                  fieldsToDisplay: [],
                                             });
                                        }}
                                   >
                                        Supprimer la fiche client
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
ClientProfile = connect(mapStateToProps, actions)(ClientProfile);
export default reduxForm({
     destroyOnUnmount: true,
     form: 'clientForm',
})(withRouter(ClientProfile));
