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

class Client extends Component {
     componentDidMount() {
          this.clientId = this.props.match.params;
          if (!this.props.client) {
               //cas where we come directly from url
               this.props.fetchClient(this.clientId);
          }
          this.activeTab = 'profile';
     }
     componentWillUnmount() {}

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
                              identifiant={this.props.identifiant}
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

     renderSideBar() {
          return (
               <Nav className="flex-column">
                    <Link
                         to={'/client/' + this.props.client._id}
                         className={
                              this.activeTab === 'profile' ? 'active' : ''
                         }
                         onClick={() => (this.activeTab = 'profile')}
                    >
                         Profile
                    </Link>
                    <Link
                         to={'/client/' + this.props.client._id}
                         className={
                              this.activeTab === 'currentCase' ? 'active' : ''
                         }
                         onClick={() => (this.activeTab = 'currentCase')}
                    >
                         Dossier en cours
                    </Link>
                    <Link
                         to={'/client/' + this.props.client._id}
                         className={
                              this.activeTab === 'closedCase' ? 'active' : ''
                         }
                         onClick={() => (this.activeTab = 'closedCase')}
                    >
                         Dossiers cloturés
                    </Link>
                    <Link
                         to={'/client/' + this.props.client._id}
                         className={
                              this.activeTab === 'location' ? 'active' : ''
                         }
                         onClick={() => (this.activeTab = 'location')}
                    >
                         Gestion locative
                    </Link>
               </Nav>
          );
     }

     render() {
          return (
               this.props.client && (
                    <>
                         <div className="row">
                              <div className="col-2">
                                   {this.renderSideBar()}
                              </div>
                              <div className="col-10">
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
                                                  className="centered"
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
                                        </div>
                                   </Form>
                              </div>
                         </div>
                    </>
               )
          );
     }
}

function mapStateToProps(props) {
     return props;
}
Client = connect(mapStateToProps, actions)(Client);
export default reduxForm({
     destroyOnUnmount: true,
     form: 'clientForm',
})(withRouter(Client));
