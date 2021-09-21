import { Field } from 'redux-form';
import axios from 'axios';
import CustomField from '../components/customs/CustomField';
import { Civility } from '../actions/types';
import React from 'react';
export async function getNotairesIdToNamesObjects() {
     let response = [];
     const res = await axios.get('/api/allNotaries');
     const notaries = res.data;
     if (notaries) {
          for (let notary of notaries) {
               response.push({
                    objectId: notary._id,
                    objectLabel:
                         notary.surname +
                         ' ' +
                         notary.name +
                         ' à ' +
                         notary.city,
               });
          }
     }
     return response;
}

export async function getSyndicsIdToNamesObjects() {
     let response = [];
     const res = await axios.get('/api/allSyndics');
     const syndics = res.data;
     if (syndics) {
          for (let syndic of syndics) {
               response.push({
                    objectId: syndic._id,
                    objectLabel: syndic.name + ' à ' + syndic.city,
               });
          }
     }
     return response;
}

export async function getUserIdToNamesObjects() {
     let response = [];
     const res = await axios.get('/api/allUsers');
     const users = res.data;
     if (users) {
          for (let user of users) {
               response.push({
                    objectId: user._id,
                    objectLabel: user.username,
               });
          }
     }
     return response;
}

export async function getSyndicFieldsToDisplay(syndicId) {
     const res = await axios.post('/api/syndic', { syndicId });
     const syndic = res.data;
     let fields = [
          {
               label: 'Nom',
               id: 'name',
               type: 'text',
               component: CustomField,
               valueToSet: syndic.name,
          },
          {
               label: 'Rue',
               id: 'street',
               type: 'text',
               component: CustomField,
               openBlock: true,
               valueToSet: syndic.street,
          },
          {
               label: 'Code postal',
               id: 'postalCode',
               type: 'number',
               component: CustomField,
               valueToSet: syndic.postalCode,
          },
          {
               label: 'Ville',
               id: 'city',
               type: 'text',
               component: CustomField,
               valueToSet: syndic.city,
          },
          {
               label: 'Num tel',
               id: 'phoneNumber',
               type: 'text',
               component: CustomField,
               valueToSet: syndic.phoneNumber,
          },
          {
               label: 'Email',
               id: 'email',
               type: 'text',
               component: CustomField,
               valueToSet: syndic.email,
          },
          {
               label: 'Commentaire',
               id: 'comment',
               type: 'textarea',
               component: CustomField,
               valueToSet: syndic.comment,
          },
     ];
     return fields;
}
export async function getNotaryFieldsToDisplay(notaryId) {
     const res = await axios.post('/api/notary', { notaryId });
     const notary = res.data;
     let fields = [
          {
               label: 'Civilité',
               id: 'civility',
               type: 'select',
               valuesToSet: Civility,
               component: CustomField,
               valueToSet: notary ? notary.civility : undefined,
          },
          {
               label: 'Nom',
               id: 'surname',
               type: 'text',
               component: CustomField,
               valueToSet: notary.surname,
          },
          {
               label: 'Prénom',
               id: 'name',
               type: 'text',
               component: CustomField,
               valueToSet: notary.name,
          },
          {
               label: 'Rue',
               id: 'street',
               type: 'text',
               component: CustomField,
               openBlock: true,
               valueToSet: notary.street,
          },
          {
               label: 'Code postal',
               id: 'postalCode',
               type: 'number',
               component: CustomField,
               valueToSet: notary.postalCode,
          },
          {
               label: 'Ville',
               id: 'city',
               type: 'text',
               component: CustomField,
               valueToSet: notary.city,
          },
          {
               label: 'Num tel',
               id: 'phoneNumber',
               type: 'text',
               component: CustomField,
               valueToSet: notary.phoneNumber,
          },
          {
               label: 'Email',
               id: 'email',
               type: 'text',
               component: CustomField,
               valueToSet: notary.email,
          },
          {
               label: 'Commentaire',
               id: 'comment',
               type: 'textarea',
               component: CustomField,
               valueToSet: notary.comment,
          },
     ];
     return fields;
}
export function getField(field, identifiants, keyObject) {
     if (!field.id) {
          return (
               <React.Fragment key={keyObject.keyValue}>
                    <label key={keyObject.keyValue + 1}>:</label>
                    <br key={keyObject.keyValue + 2} />
                    <br key={keyObject.keyValue + 3} />
               </React.Fragment>
          );
     } else {
          return (
               <Field
                    key={keyObject.keyValue}
                    label={field.label}
                    type={field.type}
                    name={field.id}
                    component={field.component}
                    disabled={field.disabled ? field.disabled : false}
                    valuetoset={field.valueToSet ? field.valueToSet : undefined}
                    valuestoset={
                         field.valuesToSet ? field.valuesToSet : undefined
                    }
                    className={field.type === 'select' ? 'browser-default' : ''}
                    id={field.id}
                    modelParentId={
                         identifiants ? identifiants.modelParentId : null
                    }
                    statetriggeredvaluesupdatefunction={(key, value) => {
                         var values = this.state.stateTriggeredValues;
                         if (key === 'files') {
                              values['files'].add(value);
                              this.setState({
                                   stateTriggeredValues: values,
                              });
                         } else {
                              values[key] = value;
                              this.setState({
                                   stateTriggeredValues: values,
                              });
                         }
                    }}
                    br={field.br}
                    viewDetailAction={field.viewDetailAction}
               />
          );
     }
}

export default getField;
