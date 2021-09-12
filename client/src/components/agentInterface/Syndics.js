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

class Syndics extends Component {
     componentDidMount() {
          this.props.fetchPage('syndics');
          this.props.fetchSyndics();
     }

     renderContent() {
          var key = 0;
          return (
               <div>
                    <h4>Liste des syndics</h4>
                    <Table striped bordered hover>
                         <thead>
                              <tr>
                                   <th>Nom</th>
                                   <th>Rue</th>
                                   <th>Code Postal</th>
                                   <th>Ville</th>
                                   <th>N° Tel</th>
                                   <th>Email</th>
                                   <th>Commentaire</th>
                              </tr>
                         </thead>
                         <tbody>
                              {this.props.syndics
                                   ? this.props.syndics.map((syndic) => {
                                          key += 4;
                                          var focusFormConfiguration = {
                                               validateButtonAction:
                                                    this.props.editSyndic,
                                               identifiants: {
                                                    modelInstanceId: syndic._id,
                                               },
                                               title: 'Edition du Syndic',
                                               description:
                                                    "Formulaire d'édition du Syndic.",
                                               validateButtonLabel:
                                                    'Editer le syndic',
                                               fieldsToDisplay: [
                                                    {
                                                         label: 'Nom',
                                                         id: 'name',
                                                         type: 'text',
                                                         component: CustomField,
                                                         valueToSet:
                                                              syndic.name,
                                                    },
                                                    {
                                                         label: 'Rue',
                                                         id: 'street',
                                                         type: 'text',
                                                         component: CustomField,
                                                         openBlock: true,
                                                         valueToSet:
                                                              syndic.street,
                                                    },
                                                    {
                                                         label: 'Code postal',
                                                         id: 'postalCode',
                                                         type: 'number',
                                                         component: CustomField,
                                                         valueToSet:
                                                              syndic.postalCode,
                                                    },
                                                    {
                                                         label: 'Ville',
                                                         id: 'city',
                                                         type: 'text',
                                                         component: CustomField,
                                                         valueToSet:
                                                              syndic.city,
                                                    },
                                                    {
                                                         label: 'Num tel',
                                                         id: 'phoneNumber',
                                                         type: 'text',
                                                         component: CustomField,
                                                         valueToSet:
                                                              syndic.phoneNumber,
                                                    },
                                                    {
                                                         label: 'Email',
                                                         id: 'email',
                                                         type: 'text',
                                                         component: CustomField,
                                                         valueToSet:
                                                              syndic.email,
                                                    },
                                                    {
                                                         label: 'Commentaire',
                                                         id: 'comment',
                                                         type: 'textarea',
                                                         component: CustomField,
                                                         valueToSet:
                                                              syndic.comment,
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
                                                         {syndic.name}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {syndic.street}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {syndic.postalCode}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {syndic.city}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {syndic.phoneNumber}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {syndic.email}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {syndic.comment}
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
                                                                                                 .deleteSyndic,
                                                                                       identifiants:
                                                                                            {
                                                                                                 modelInstanceId:
                                                                                                      syndic._id,
                                                                                            },
                                                                                       title: 'Suppression le syndic',
                                                                                       description:
                                                                                            'Etes-vous sûr de vouloir supprimer le syndic?',
                                                                                       validateButtonLabel:
                                                                                            'Supprimer le syndic',
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
                                        this.props.createSyndic,
                                   title: "Ajout d'un nouveau syndic",
                                   description:
                                        "Formulaire d'ajout d'un nouveau syndic.",
                                   validateButtonLabel: 'Ajouter le syndic',
                                   fieldsToDisplay: [
                                        {
                                             label: 'Nom',
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
function mapStateToProps({ syndics, flash, auth, focusFormConfiguration }) {
     return { syndics, flash, auth, focusFormConfiguration };
}

export default connect(mapStateToProps, actions)(withRouter(Syndics));
