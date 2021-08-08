//Rendering layer control (React router content)
import '../../css/index.css';
// import 'materialize-css/dist/css/materialize.min.css'; //we have to precise extension when not importing js files
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import FocusForm from './FocusForm';
import CustomField from '../customs/CustomField';
import { AdType } from '../../actions/types';
import _ from 'lodash';

class HomeAdsList extends Component {
     constructor(props) {
          super(props);

          this.state = {
               showFocusForm: false,
          };
     }
     componentDidMount() {
          this.props.fetchPage('homeAdsList');
          this.props.fetchHomeAds();
          this.closeFocusForm = this.closeFocusForm.bind(this);
          this.computeFormOpeningStatus =
               this.computeFormOpeningStatus.bind(this);
          this.backButtonTriggered = false;
          this.createUserButtonTriggered = false;
          this.identifiant = undefined;
          this.validateButtonAction = undefined;
          this.title = undefined;
          this.description = undefined;
          this.validateButtonLabel = undefined;
          this.fieldsToDisplay = undefined;
     }

     resetState(homeAd) {
          if (this.props.flash) {
               this.props.flash.message = false;
          }
          this.setState({ showFocusForm: true });
          this.backButtonTriggered = false;
          this.createUserButtonTriggered = false;

          if (homeAd) {
               this.identifiant = homeAd._id;
          }
     }
     setHomeAdEditionVariables(homeAd) {
          this.validateButtonAction = this.props.editHomeAd;

          this.title = "Edition de l'annonce";
          this.description =
               "Vous pouvez modifier chaque élément de l'annonce.";
          this.validateButtonLabel = "Modifier l'annonce";
          this.fieldsToDisplay = [
               {
                    label: 'Title',
                    id: 'title',
                    type: 'text',
                    component: CustomField,
                    valueToSet: homeAd.title,
               },
               {
                    label: 'Description',
                    id: 'description',
                    type: 'textarea',
                    component: CustomField,
                    valueToSet: homeAd.description,
               },
               {
                    label: 'Type',
                    id: 'type',
                    type: 'select',
                    component: 'select',
                    valueToSet: homeAd.isLocation ? 'location' : 'vente',
                    values: AdType,
               },
          ];
     }

     setHomeAdDeletionVariables() {
          this.validateButtonAction = this.props.deleteHomeAd;
          this.title = "Suppression de l'annonce";
          this.description = "Etes-vous sûr de vouloir supprimer l'annonce?";
          this.validateButtonLabel = "Supprimer l'annonce";
          this.fieldsToDisplay = [];
     }

     setHomeAdCreationVariables() {
          this.validateButtonAction = this.props.createHomeAd;
          this.title = "Création d'annonce immobilière";
          this.description =
               "Formulaire de création d'annonce immobilière afficher sur le site vitrine.";
          this.validateButtonLabel = "Créer l'annonce";
          this.fieldsToDisplay = [
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
                    component: 'textarea',
               },
               {
                    label: 'Type',
                    id: 'type',
                    type: 'select',
                    component: 'select',
                    valueToSet: 'location',
                    values: AdType,
               },
               {
                    label: 'Choose images',
                    id: 'file',
                    type: 'file',
                    component: CustomField,
               },
          ];
     }
     renderImages(images) {
          return _.map(images, (image) => {
               return (
                    <img
                         title={images}
                         className="thumbnail padding-right-10"
                         src={'/api/images/' + image}
                    />
               );
          });
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
                                                    <td>{homeAd.title}</td>
                                                    <td>
                                                         {homeAd.description}
                                                    </td>
                                                    <td>
                                                         {homeAd.isLocation
                                                              ? 'Location'
                                                              : 'Vente'}
                                                    </td>
                                                    <td>
                                                         {this.renderImages(
                                                              homeAd.images
                                                         )}
                                                    </td>
                                                    <td>
                                                         <div
                                                              onClick={() => {
                                                                   this.resetState(
                                                                        homeAd
                                                                   );
                                                                   this.setHomeAdEditionVariables(
                                                                        homeAd
                                                                   );
                                                              }}
                                                              className="selectable secondary-content teal-text"
                                                         >
                                                              <i className="material-icons">
                                                                   mode_edit
                                                              </i>
                                                         </div>
                                                         <div
                                                              onClick={() => {
                                                                   this.resetState(
                                                                        homeAd
                                                                   );
                                                                   this.setHomeAdDeletionVariables();
                                                              }}
                                                              href="#!"
                                                              className="selectable secondary-content red-text"
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
                    </table>
               </div>
          );
     }

     closeFocusForm(actionFromBackButton, actionFromNewUserButton) {
          this.backButtonTriggered = actionFromBackButton;
          this.createUserButtonTriggered = actionFromNewUserButton;
          this.setState({ showFocusForm: false });
     }
     computeFormOpeningStatus(showFocusForm, flash) {
          if (this.backButtonTriggered) {
               return false;
          } else if (this.createUserButtonTriggered) {
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
     renderFocusForm(showFocusForm) {
          if (this.computeFormOpeningStatus(showFocusForm, this.props.flash)) {
               return (
                    <FocusForm
                         doOpen={true}
                         onTheClose={this.closeFocusForm}
                         validateButtonAction={this.validateButtonAction}
                         identifiant={this.identifiant}
                         title={this.title}
                         description={this.description}
                         fieldsToDisplay={this.fieldsToDisplay}
                         validateButtonLabel={this.validateButtonLabel}
                    />
               );
          }
     }

     render() {
          return (
               <div>
                    {this.renderFocusForm(this.state.showFocusForm)}
                    {this.renderContent()}
                    <div className="fixed-action-btn">
                         <div
                              className="btn-floating btn-large teal"
                              onClick={() => {
                                   this.resetState(null);
                                   this.setHomeAdCreationVariables();
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

export default connect(mapStateToProps, actions)(HomeAdsList);
