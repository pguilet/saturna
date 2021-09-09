//Rendering layer control (React router content)
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import CustomField from '../customs/CustomField';
import moment from 'moment';
import { FamilySituation, Civility } from '../../actions/types';
import { Link, withRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserRouter } from 'react-router-dom';
import GuardedRoute from '../GuardedRoute';
import ClientCases from './ClientCases';
import FocusForm from './FocusForm';

class ClientProfile extends Component {
     componentDidMount() {
          this.clientId = this.props.client._id;
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
                    valueToSet: client
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
                    type: 'number',
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
                    label: 'Commentaire',
                    id: 'comment',
                    type: 'textarea',
                    component: CustomField,
                    valueToSet: client.comment,
                    block: 2,
               },
          ];
          return <div className="row">{this.renderRow(fieldsToDisplay)}</div>;
     }

     renderRow(fieldsToDisplay) {
          return _.map([1, 2], (i) => {
               return (
                    <div key={i} className="col-6">
                         {this.renderCols(fieldsToDisplay, i)}
                    </div>
               );
          });
     }

     renderCols(fieldsToDisplay, i) {
          return _.map(
               fieldsToDisplay.filter((field) => field.block === i),
               (field) => {
                    return (
                         <Field
                              key={field.id}
                              label={field.label}
                              type={field.type}
                              name={field.id}
                              component={field.component}
                              disabled={field.disabled ? field.disabled : false}
                              valuetoset={
                                   field.valueToSet
                                        ? field.valueToSet
                                        : undefined
                              }
                              valuestoset={
                                   field.valuesToSet
                                        ? field.valuesToSet
                                        : undefined
                              }
                              className={
                                   field.type === 'select'
                                        ? 'browser-default'
                                        : ''
                              }
                              id={field.id}
                              identifiant={this.props.client._id}
                              statetriggeredvaluesupdatefunction={(values) =>
                                   this.setState({
                                        stateTriggeredValues: values,
                                   })
                              }
                              extralabel={field.extraLabel}
                              br={field.br}
                         />
                    );
               }
          );
     }

     render() {
          return (
               this.props.client && (
                    <>
                         <FocusForm />
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
                                                  this.props.form,
                                                  this.clientId
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
                                                  identifiant: {
                                                       _id: this.props.client
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
     destroyOnUnmount: false,
     form: 'clientForm',
})(withRouter(ClientProfile));
