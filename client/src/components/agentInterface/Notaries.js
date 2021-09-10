//Rendering layer control (React router content)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import FocusForm from './FocusForm';
import { Roles, Civility } from '../../actions/types';
import FixedFloatingButton from '../customs/FixedFloatingButton';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import CustomField from '../customs/CustomField';

class Notaries extends Component {
     componentDidMount() {
          this.props.fetchPage('notaries');
          this.props.fetchNotaries();
     }

     renderContent() {
          var key = 0;
          return (
               <div>
                    <h4>Liste des notaires</h4>
                    <Table striped bordered hover>
                         <thead>
                              <tr>
                                   <th>Civilité</th>
                                   <th>Nom</th>
                                   <th>Prénom</th>
                                   <th>Rue</th>
                                   <th>Code Postal</th>
                                   <th>Ville</th>
                                   <th>N° Tel</th>
                                   <th>Email</th>
                                   <th>Commentaire</th>
                              </tr>
                         </thead>
                         <tbody>
                              {this.props.notaries
                                   ? this.props.notaries.map((notary) => {
                                          key += 4;
                                          var focusFormConfiguration = {
                                               validateButtonAction:
                                                    this.props.editNotary,
                                               identifiant: {
                                                    _id: notary._id,
                                               },
                                               title: "Edition d'un nouveau notaire",
                                               description:
                                                    "Formulaire d'édition d'un nouveau notaire.",
                                               validateButtonLabel:
                                                    'Editer le notaire',
                                               fieldsToDisplay: [
                                                    {
                                                         label: 'Civilité',
                                                         id: 'civility',
                                                         type: 'select',
                                                         valuesToSet: Civility,
                                                         component: CustomField,
                                                         valueToSet: notary
                                                              ? notary.civility
                                                              : undefined,
                                                    },
                                                    {
                                                         label: 'Nom',
                                                         id: 'surname',
                                                         type: 'text',
                                                         component: CustomField,
                                                         valueToSet:
                                                              notary.surname,
                                                    },
                                                    {
                                                         label: 'Prénom',
                                                         id: 'name',
                                                         type: 'text',
                                                         component: CustomField,
                                                         valueToSet:
                                                              notary.name,
                                                    },
                                                    {
                                                         label: 'Rue',
                                                         id: 'street',
                                                         type: 'text',
                                                         component: CustomField,
                                                         openBlock: true,
                                                         valueToSet:
                                                              notary.street,
                                                    },
                                                    {
                                                         label: 'Code postal',
                                                         id: 'postalCode',
                                                         type: 'number',
                                                         component: CustomField,
                                                         valueToSet:
                                                              notary.postalCode,
                                                    },
                                                    {
                                                         label: 'Ville',
                                                         id: 'city',
                                                         type: 'text',
                                                         component: CustomField,
                                                         valueToSet:
                                                              notary.city,
                                                    },
                                                    {
                                                         label: 'Num tel',
                                                         id: 'phoneNumber',
                                                         type: 'text',
                                                         component: CustomField,
                                                         valueToSet:
                                                              notary.phoneNumber,
                                                    },
                                                    {
                                                         label: 'Email',
                                                         id: 'email',
                                                         type: 'text',
                                                         component: CustomField,
                                                         valueToSet:
                                                              notary.email,
                                                    },
                                                    {
                                                         label: 'Commentaire',
                                                         id: 'comment',
                                                         type: 'textarea',
                                                         component: CustomField,
                                                         valueToSet:
                                                              notary.comment,
                                                    },
                                               ],
                                          };
                                          return (
                                               <tr key={key + 1}>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {notary.civility}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {notary.surname}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {notary.name}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {notary.street}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {notary.postalCode}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {notary.city}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {notary.phoneNumber}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {notary.email}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {notary.comment}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
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
                                                                                                 .deleteNotary,
                                                                                       identifiant:
                                                                                            {
                                                                                                 _id: notary._id,
                                                                                            },
                                                                                       title: 'Suppression le notaire',
                                                                                       description:
                                                                                            'Etes-vous sûr de vouloir supprimer le notaire?',
                                                                                       validateButtonLabel:
                                                                                            'Supprimer le notaire',
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
                    <FixedFloatingButton
                         onClick={() => {
                              this.props.configureFocusForm({
                                   validateButtonAction:
                                        this.props.createNotary,
                                   title: "Ajout d'un nouveau notaire",
                                   description:
                                        "Formulaire d'ajout d'un nouveau notaire.",
                                   validateButtonLabel: 'Ajouter le notaire',
                                   fieldsToDisplay: [
                                        {
                                             label: 'Civilité',
                                             id: 'civility',
                                             type: 'select',
                                             valuesToSet: Civility,
                                             component: CustomField,
                                        },
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
                                             label: 'Rue',
                                             id: 'street',
                                             type: 'text',
                                             component: CustomField,
                                             openBlock: true,
                                        },
                                        {
                                             label: 'Code postal',
                                             id: 'postalCode',
                                             type: 'number',
                                             component: CustomField,
                                        },
                                        {
                                             label: 'Ville',
                                             id: 'city',
                                             type: 'text',
                                             component: CustomField,
                                        },
                                        {
                                             label: 'Num tel',
                                             id: 'phoneNumber',
                                             type: 'text',
                                             component: CustomField,
                                        },
                                        {
                                             label: 'Email',
                                             id: 'email',
                                             type: 'text',
                                             component: CustomField,
                                        },
                                        {
                                             label: 'Commentaire',
                                             id: 'comment',
                                             type: 'textarea',
                                             component: CustomField,
                                        },
                                   ],
                              });
                         }}
                    />
               </div>
          );
     }
}
function mapStateToProps({ notaries, flash, auth, focusFormConfiguration }) {
     return { notaries, flash, auth, focusFormConfiguration };
}

export default connect(mapStateToProps, actions)(withRouter(Notaries));
