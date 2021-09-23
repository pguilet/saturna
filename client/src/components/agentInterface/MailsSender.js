import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import FocusForm from './FocusForm';
import FixedFloatingButton from '../customs/FixedFloatingButton';
import CustomField from '../customs/CustomField';
import Table from 'react-bootstrap/Table';
import moment from 'moment';

class MailsSender extends Component {
     componentDidMount() {
          this.props.fetchPage('');
          this.props.fetchMails();
     }

     renderContent() {
          return (
               <div className="container">
                    <h4>Liste des mails</h4>
                    <Table striped bordered hover>
                         <thead>
                              <tr>
                                   <th>Nom</th>
                                   <th>Commentaire</th>
                                   <th>Date du dernier envoi</th>
                                   <th>
                                        Nombre de clients impactés par le
                                        dernier envoi
                                   </th>
                              </tr>
                         </thead>
                         <tbody>
                              {this.props.mails
                                   ? this.props.mails.map((mail) => {
                                          var focusFormConfiguration = {
                                               validateButtonAction:
                                                    this.props.editMail,
                                               identifiants: {
                                                    modelInstanceId: mail._id,
                                               },
                                               title: "Edition de l'annonce",
                                               description:
                                                    "Vous pouvez modifier chaque élément de l'annonce.",
                                               validateButtonLabel:
                                                    "Modifier l'annonce",
                                               fieldsToDisplay: [
                                                    {
                                                         label: 'Nom du mail',
                                                         id: 'name',
                                                         type: 'text',
                                                         component: CustomField,
                                                         valueToSet: mail
                                                              ? mail.name
                                                              : undefined,
                                                    },
                                                    {
                                                         label: 'Objet du mail',
                                                         id: 'object',
                                                         type: 'text',
                                                         component: CustomField,
                                                         valueToSet: mail
                                                              ? mail.object
                                                              : undefined,
                                                    },
                                                    {
                                                         label: 'Commentaire sur le mail',
                                                         id: 'comment',
                                                         valueToSet: mail
                                                              ? mail.comment
                                                              : undefined,
                                                         type: 'textarea',
                                                         component: CustomField,
                                                    },
                                                    {
                                                         label: 'Contenu du mail',
                                                         id: 'mailContent',
                                                         type: 'wEditor',
                                                         valueToSet: mail
                                                              ? mail.mailContent
                                                              : undefined,
                                                         component: CustomField,
                                                    },
                                                    {
                                                         extraLabel:
                                                              'Profils à qui envoyer le mail',
                                                         label: 'Abonnés newsletter',
                                                         id: 'newsletterSuscribing',
                                                         type: 'checkbox',
                                                         valueToSet:
                                                              mail &&
                                                              mail.newsletterSuscribing
                                                                   ? true
                                                                   : undefined,
                                                         component: CustomField,
                                                    },
                                                    {
                                                         label: 'Investisseurs',
                                                         id: 'profilInvest',
                                                         type: 'checkbox',
                                                         valueToSet:
                                                              mail &&
                                                              mail.profilInvest
                                                                   ? true
                                                                   : undefined,
                                                         component: CustomField,
                                                    },
                                                    {
                                                         label: 'Locataires',
                                                         id: 'profilRent',
                                                         type: 'checkbox',
                                                         valueToSet:
                                                              mail &&
                                                              mail.profilRent
                                                                   ? true
                                                                   : undefined,
                                                         component: CustomField,
                                                    },
                                                    {
                                                         label: 'Propriétaires',
                                                         id: 'profilOwner',
                                                         type: 'checkbox',
                                                         valueToSet:
                                                              mail &&
                                                              mail.profilOwner
                                                                   ? true
                                                                   : undefined,
                                                         component: CustomField,
                                                         br: true,
                                                         closeBlock: true,
                                                    },
                                               ],
                                          };
                                          return (
                                               <tr key={mail._id}>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {mail.name}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {mail.comment}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {mail &&
                                                         mail.lastSendingDate
                                                              ? moment(
                                                                     mail.lastSendingDate
                                                                ).format(
                                                                     'YYYY-MM-DD'
                                                                )
                                                              : undefined}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {mail.lastClientsBatch}
                                                    </td>
                                                    <td>
                                                         <div
                                                              className="inline selectable secondary-content text-primary"
                                                              title="Envoyer"
                                                              onClick={async () => {
                                                                   this.props.configureFocusForm(
                                                                        {
                                                                             validateButtonAction:
                                                                                  this
                                                                                       .props
                                                                                       .sendMail,
                                                                             identifiants:
                                                                                  {
                                                                                       modelInstanceId:
                                                                                            mail._id,
                                                                                  },
                                                                             title: 'Envoi du mail',
                                                                             description:
                                                                                  'Etes-vous sûr de vouloir envoyer le mail aux clients correspondant aux catégories sélectionnées?',
                                                                             validateButtonLabel:
                                                                                  'Envoyer le mail',
                                                                             fieldsToDisplay:
                                                                                  [],
                                                                        }
                                                                   );
                                                              }}
                                                         >
                                                              <i className="material-icons">
                                                                   send
                                                              </i>
                                                         </div>
                                                         <div
                                                              onClick={() => {
                                                                   this.props.configureFocusForm(
                                                                        focusFormConfiguration
                                                                   );
                                                              }}
                                                              className="selectable inline secondary-content text-teal"
                                                         >
                                                              <i className="material-icons">
                                                                   mode_edit
                                                              </i>
                                                         </div>

                                                         <div
                                                              onClick={() => {
                                                                   this.props.configureFocusForm(
                                                                        {
                                                                             validateButtonAction:
                                                                                  this
                                                                                       .props
                                                                                       .deleteMail,
                                                                             identifiants:
                                                                                  {
                                                                                       modelInstanceId:
                                                                                            mail._id,
                                                                                  },
                                                                             title: 'Suppression du mail',
                                                                             description:
                                                                                  'Etes-vous sûr de vouloir supprimer le mail?',
                                                                             validateButtonLabel:
                                                                                  'Supprimer le mail',
                                                                             fieldsToDisplay:
                                                                                  [],
                                                                        }
                                                                   );
                                                              }}
                                                              className="inline selectable secondary-content text-danger"
                                                         >
                                                              <i className="material-icons">
                                                                   delete
                                                              </i>
                                                         </div>
                                                    </td>
                                               </tr>
                                          );
                                     })
                                   : null}
                         </tbody>
                    </Table>
                    <div
                         className="text-danger"
                         style={{ marginBottom: '20px' }}
                    >
                         {this.props.flash ? this.props.flash.message : ''}
                    </div>
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
                                   validateButtonAction: this.props.newMail,
                                   title: 'Envoi de mails groupés',
                                   description:
                                        "Formulaire d'envoi de mails à une ou plusieurs catégories de client.",
                                   validateButtonLabel: 'Créer le mail',
                                   fieldsToDisplay: [
                                        {
                                             label: 'Nom du mail',
                                             id: 'name',
                                             type: 'text',
                                             component: CustomField,
                                        },
                                        {
                                             label: 'Commentaire sur le mail',
                                             id: 'comment',
                                             type: 'textarea',
                                             component: CustomField,
                                        },
                                        {
                                             label: 'Contenu du mail',
                                             id: 'mailContent',
                                             type: 'wEditor',
                                             component: CustomField,
                                        },
                                        {
                                             extraLabel:
                                                  'Profils à qui envoyer le mail',
                                             label: 'Abonnés newsletter',
                                             id: 'newsletterSuscribing',
                                             type: 'checkbox',
                                             valueToSet: true,
                                             component: CustomField,
                                        },
                                        {
                                             label: 'Investisseurs',
                                             id: 'profilInvest',
                                             type: 'checkbox',
                                             component: CustomField,
                                        },
                                        {
                                             label: 'Locataires',
                                             id: 'profilRent',
                                             type: 'checkbox',
                                             component: CustomField,
                                        },
                                        {
                                             label: 'Propriétaires',
                                             id: 'profilOwner',
                                             type: 'checkbox',
                                             component: CustomField,
                                             br: true,
                                             closeBlock: true,
                                        },
                                   ],
                              });
                         }}
                    />
               </div>
          );
     }
}
function mapStateToProps(props) {
     return props;
}

export default connect(mapStateToProps, actions)(MailsSender);
