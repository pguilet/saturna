//Rendering layer control (React router content)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import FocusForm from './FocusForm';
import FixedFloatingButton from '../customs/FixedFloatingButton';
import CustomField from '../customs/CustomField';
import { AdType } from '../../actions/types';
import _ from 'lodash';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

class HomeAdsList extends Component {
     componentDidMount() {
          this.props.fetchPage('homeAdsList');
          this.props.fetchHomeAds();
     }

     renderImages(images) {
          var x = 0;
          return _.map(images, (imageKey) => {
               return (
                    <img
                         key={imageKey + x}
                         title={imageKey}
                         className="thumbnail separated"
                         src={'/api/images/' + imageKey}
                         alt="thumbnail"
                    />
               );
          });
     }
     renderContent() {
          var key = 0;
          return (
               <div>
                    <h4>Liste des annonces immobilières</h4>
                    <Table striped bordered hover>
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
                                          var adType;
                                          if (
                                               homeAd.adType === AdType.LOCATION
                                          ) {
                                               adType = AdType.LOCATION;
                                          } else if (
                                               homeAd.adType === AdType.SELLING
                                          ) {
                                               adType = AdType.SELLING;
                                          }
                                          var focusFormConfiguration = {
                                               validateButtonAction:
                                                    this.props.editHomeAd,
                                               identifiants: {
                                                    modelInstanceId: homeAd._id,
                                               },
                                               title: "Edition de l'annonce",
                                               description:
                                                    "Vous pouvez modifier chaque élément de l'annonce.",
                                               validateButtonLabel:
                                                    "Modifier l'annonce",
                                               fieldsToDisplay: [
                                                    {
                                                         label: 'Title',
                                                         id: 'title',
                                                         type: 'text',
                                                         component: CustomField,
                                                         valueToSet:
                                                              homeAd.title,
                                                    },
                                                    {
                                                         label: 'Description',
                                                         id: 'description',
                                                         type: 'textarea',
                                                         component: CustomField,
                                                         valueToSet:
                                                              homeAd.description,
                                                    },
                                                    {
                                                         label: 'Type',
                                                         id: 'adType',
                                                         type: 'select',
                                                         component: CustomField,
                                                         valueToSet: adType,
                                                         valuesToSet: AdType,
                                                    },
                                                    {
                                                         label: 'Photos',
                                                         id: 'images',
                                                         type: 'images',
                                                         component: CustomField,
                                                         valuesToSet:
                                                              homeAd.images,
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
                                                         {homeAd.title}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {homeAd.description}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {adType}
                                                    </td>
                                                    <td
                                                         className="selectable"
                                                         onClick={() => {
                                                              this.props.configureFocusForm(
                                                                   focusFormConfiguration
                                                              );
                                                         }}
                                                    >
                                                         {this.renderImages(
                                                              homeAd.images
                                                         )}
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
                                                                   mode_edit
                                                              </i>
                                                         </div>
                                                    </td>
                                                    <td>
                                                         <div
                                                              onClick={() => {
                                                                   this.props.configureFocusForm(
                                                                        {
                                                                             validateButtonAction:
                                                                                  this
                                                                                       .props
                                                                                       .deleteHomeAd,
                                                                             identifiants:
                                                                                  {
                                                                                       modelInstanceId:
                                                                                            homeAd._id,
                                                                                  },
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
               </div>
          );
     }

     async deleteTemporaryUploadDirectory() {
          axios.post('/api/deleteTemporaryUploadDirectory');
     }

     render() {
          return (
               <div>
                    {this.props.focusFormConfiguration && <FocusForm />}
                    {this.renderContent()}
                    <FixedFloatingButton
                         onClick={() => {
                              this.props.configureFocusForm({
                                   backButtonCallback: () =>
                                        this.deleteTemporaryUploadDirectory(),
                                   validateButtonAction:
                                        this.props.createHomeAd,
                                   title: "Création d'annonce immobilière",
                                   description:
                                        "Formulaire de création d'annonce immobilière afficher sur le site vitrine.",
                                   validateButtonLabel: "Créer l'annonce",
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
                                             type: 'textarea',
                                             component: CustomField,
                                        },
                                        {
                                             label: 'Type',
                                             id: 'adType',
                                             type: 'select',
                                             component: CustomField,
                                             valuesToSet: AdType,
                                        },
                                        {
                                             label: 'Photos',
                                             id: 'images',
                                             type: 'images',
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
function mapStateToProps({ homeAds, flash, focusFormConfiguration }) {
     return { homeAds, flash, focusFormConfiguration };
}

export default connect(mapStateToProps, actions)(HomeAdsList);
