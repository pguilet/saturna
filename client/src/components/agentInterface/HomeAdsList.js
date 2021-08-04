//Rendering layer control (React router content)
import '../../css/index.css';
// import 'materialize-css/dist/css/materialize.min.css'; //we have to precise extension when not importing js files
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import FocusForm from './FocusForm';
import CustomField from '../customs/CustomField';
import { AdType } from '../../actions/types';

class AgentsList extends Component {
     state = {
          showFocusForm: false,
          backButtonTriggered: false,
          createUserButtonTriggered: false,
          identifiant: undefined,
          validateButtonAction: undefined,
          title: undefined,
          description: undefined,
          validateButtonLabel: undefined,
          fieldsToDisplay: undefined,
     };
     componentDidMount() {
          this.props.fetchPage('homeAdsList');
          this.props.fetchHomeAds();
          this.closeFocusForm = this.closeFocusForm.bind(this);
     }

     resetState(homeAd) {
          if (this.props.flash) {
               this.props.flash.message = false;
          }
          this.setState({
               showFocusForm: true,
               backButtonTriggered: false,
               createUserButtonTriggered: false,
          });
          if (homeAd) {
               this.setState({
                    identifiant: homeAd._id,
               });
          }
     }
     renderContent() {
          var key = 0;
          return (
               <div>
                    <h4>Liste des annonces immobilières</h4>
                    <table>
                         <thead>
                              <tr>
                                   <th>Titre</th>
                                   <th>Description</th>
                                   <th>Type</th>
                                   <th>Photos</th>
                              </tr>
                         </thead>
                         <tbody>
                              {this.props.homeAds
                                   ? this.props.homeAds.map((homeAd) => {
                                          key += 4;
                                          return (
                                               <tr key={key + 1}>
                                                    <td>
                                                         {homeAd.title}
                                                      
                                                    </td>
                                                    <td>{homeAd.description}</td>
                                                    <td>{homeAd.isLocation?"Location":"Vente"}</td>
                                                    <td>Images</td>
                                                     <td>
                                                         <a
                                                              onClick={() => {
                                                                 this.resetState(
                                                                      homeAd
                                                                 );
                                                                   this.setState(
                                                                        {
                                                                             validateButtonAction:
                                                                                  this
                                                                                       .props
                                                                                       .deleteHomeAd,
                                                                             title: "Suppression de l'annonce",
                                                                             description:
                                                                                  "Etes-vous sûr de vouloir supprimer l'annonce?",
                                                                             validateButtonLabel:
                                                                                  "Supprimer l'annonce",
                                                                             fieldsToDisplay:
                                                                                  [],
                                                                        }
                                                                   );
                                                              }}
                                                              href="#!"
                                                              className="secondary-content red-text"
                                                         >
                                                              <i className="material-icons">
                                                                   delete
                                                              </i>
                                                         </a>
                                                         </td>
                                                        {/*   <a
                                                              onClick={() => {
                                                                   this.resetState(
                                                                        user
                                                                 );
                                                                   this.setState(
                                                                        {
                                                                             validateButtonAction:
                                                                                  this
                                                                                       .props
                                                                                       .editUser,

                                                                             title: "Edition de l'utilisateur",
                                                                             description:
                                                                                  "Veuillez sélectionner le rôle de l'agent et un nouveau password ou laisser le vide pour qu'il ne soit pas changé.",
                                                                             validateButtonLabel:
                                                                                  "Editer l'utilisateur",
                                                                             fieldsToDisplay:
                                                                                  [
                                                                                       {
                                                                                            label: 'Username',
                                                                                            id: 'username',
                                                                                            type: 'text',
                                                                                            component:
                                                                                                 CustomField,
                                                                                            disabled: true,
                                                                                            valueToSet:
                                                                                                 user.username,
                                                                                       },
                                                                                       {
                                                                                            label: 'Password',
                                                                                            id: 'password',
                                                                                            type: 'text',
                                                                                            component:
                                                                                                 CustomField,
                                                                                       },
                                                                                       {
                                                                                            label: 'Rôle',
                                                                                            id: 'role',
                                                                                            type: 'select',
                                                                                            component:
                                                                                                 'select',
                                                                                            valueToSet:
                                                                                                 user.role,
                                                                                            values: Roles,
                                                                                       },
                                                                                  ],
                                                                        }
                                                                   );
                                                              }}
                                                              href="#!"
                                                              className="secondary-content teal-text"
                                                         >
                                                              <i className="material-icons">
                                                                   mode_edit
                                                              </i>
                                                         </a>
                                                    </td> */}
                                               </tr>
                                          );
                                     })
                                   : null}
                         </tbody>
                    </table>
               </div>
          );
     }

     closeFocusForm(actionFromBackButton, actionFromNewUserButton) {
          this.setState({
               backButtonTriggered: actionFromBackButton,
               createUserButtonTriggered: actionFromNewUserButton,
          });
     }
     computeFormOpeningStatus(showFocusForm, flash) {
          if (this.state.backButtonTriggered) {
               return false;
          } else if (this.state.createUserButtonTriggered) {
               if (flash && flash.message) {
                    return true;
               } else if (flash && flash.message === false) {
                    return false;
               } else {
                    return true;
               }
          } else {
               if (showFocusForm) {
                    return true;
               } else {
                    return false;
               }
          }
     }
     renderFocusForm() {
          if (
               this.computeFormOpeningStatus(
                    this.state.showFocusForm,
                    this.props.flash
               )
          ) {
               return (
                    <FocusForm
                         doOpen={true}
                         onTheClose={this.closeFocusForm}
                         validateButtonAction={this.state.validateButtonAction}
                         identifiant={this.state.identifiant}
                         title={this.state.title}
                         description={this.state.description}
                         fieldsToDisplay={this.state.fieldsToDisplay}
                         validateButtonLabel={this.state.validateButtonLabel}
                    />
               );
          }
     }

     render() {
          return (
               
               <div>
                    <form action="/api/uploadImage" method="post" encType="multipart/form-data">
  <input type="file" name="file" />
  <input type="submit" className="btn btn-warning btn-lg"/>
</form>
                    {this.renderFocusForm()}
                    {this.renderContent()}
                    <div className="fixed-action-btn">
                         <div
                              className="btn-floating btn-large teal"
                              onClick={() => {
                                   this.resetState();
                                   this.setState({
                                        validateButtonAction:
                                             this.props.createHomeAd,
                                        title: "Création d'annonce immobilière",
                                        description:
                                             "Formulaire de création d'annonce immobilière afficher sur le site vitrine.",
                                        validateButtonLabel:
                                             "Créer l'annonce",
                                        fieldsToDisplay: [
                                             {
                                                  label: 'Title',
                                                  id: 'title',
                                                  type: 'text',
                                                  component: CustomField,
                                             },
                                             {
                                                  label: 'Description',
                                                  id: 'description',
                                                  type: 'text',
                                                  component: CustomField,
                                             },
                                             {
                                                  label: 'Type',
                                                  id: 'type',
                                                  type: 'select',
                                                  component: 'select',
                                                  valueToSet: 'location',
                                                  values: AdType,
                                             },
                                        ],
                                   });
                              }}
                         >
                              <i className="material-icons">add</i>
                         </div>
                    </div>
               </div>
          );
     }
}
function mapStateToProps({ homeAds, flash }) {
     return { homeAds, flash };
}

export default connect(mapStateToProps, actions)(AgentsList);
