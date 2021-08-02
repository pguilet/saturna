// SurveyForm shows a form for the user to add inputs.
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import CustomField from '../customs/CustomField';
import { Roles } from '../../actions/types';

class NewAgentForm extends Component {

     renderFirstOption() {
          var role = this.props.editMode.role;
          if (role) {
               return (
                    <option key={role} value={role}>
                         {role}
                    </option>
               );
          }
     }
     renderOtherOptions() {
          return _.map(Roles, (role) => {
               if (role !== this.props.editMode.role || !this.props.editMode) {
                    return (
                         <option key={role} value={role}>
                              {role}
                         </option>
                    );
               }
          });
     }
     render() {
          return (
               <Dialog
                    open={this.props.doOpen}
                    aria-labelledby="form-dialog-title"
               >
                    <DialogTitle id="form-dialog-title">
                         {this.props.editMode
                              ? "Edition de l'utilisateur"
                              : "Création d'utilisateur"}
                    </DialogTitle>
                    <DialogContent>
                         <DialogContentText>
                              {this.props.editMode
                                   ? "Veuillez sélectionner le rôle de l'agent et un nouveau password ou laisser le vide pour qu'il ne soit pas changé."
                                   : "Veuillez rentrer le nom d'utilisateur et le mot de passe d'un agent pour que celui-ci puisse accéder à l'interface dédiée."}
                         </DialogContentText>{' '}
                         <form>
                              <Field
                                   key="Username"
                                   label="Username"
                                   type="text"
                                   name="Username"
                                   component={CustomField}
                                   input={{
                                        disabled: this.props.editMode,
                                        value: this.props.editMode.username,
                                   }}
                              />
                              <Field
                                   key="Password"
                                   label="Password"
                                   type="text"
                                   name="Password"
                                   component={CustomField}
                              />
                              <label>Rôle</label>
                              <Field
                                   key="role"
                                   name="role"
                                   label="Rôle"
                                   component="select"
                                   className="browser-default"
                              >
                                   {this.renderFirstOption()}
                                   {this.renderOtherOptions()}
                              </Field>
                              <div
                                   className="red-text"
                                   style={{ marginBottom: '20px' }}
                              >
                                   {this.props.flash
                                        ? this.props.flash.message
                                        : ''}
                              </div>
                         </form>
                    </DialogContent>
                    <DialogActions>
                         <button
                              className="yellow darken-3 white-text btn-flat"
                              onClick={() => {
                                   this.props.onTheClose(true, false);
                              }}
                         >
                              Back
                              <i className="material-icons right">cancel</i>
                         </button>
                         <button
                              className="green right btn-flat white-text"
                              onClick={() => {
                                   this.props.editMode
                                        ? this.props.editUser(this.props.form,this.props.editMode.username)
                                        : this.props.createUser(
                                               this.props.form
                                          );
                                   this.props.onTheClose(false, true);
                              }}
                         >
                              {this.props.editMode
                                   ? "Editer l'utilisateur"
                                   : " Créer l'utilisateur"}
                              <i className="material-icons right">done</i>
                         </button>
                    </DialogActions>
               </Dialog>
          );
     }
}

function mapStateToProps(props) {
     return props;
}
NewAgentForm = connect(mapStateToProps, actions)(NewAgentForm);
export default reduxForm({
     destroyOnUnmount: true,
     form: 'newAgentForm',
})(NewAgentForm);
