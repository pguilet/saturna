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
// import SurveyField from "./SurveyField";
// import validateEmails from '../../../utils/validateEmails';
// import formFields from './formFields';

class NewAgentForm extends Component {
     render() {
          return (
               <Dialog
                    open={this.props.doOpen}
                    
                    aria-labelledby="form-dialog-title"
               >
                    <DialogTitle id="form-dialog-title">
                         Création d'utilisateur
                    </DialogTitle>
                    <DialogContent>
                         <DialogContentText>
                              Veuillez rentrer le nom d'utilisateur et le mot de
                              passe d'un agent pour que celui-ci puisse accéder
                              à l'interface dédiée.
                         </DialogContentText>{' '}
                         <form>
                              <Field
                                   key="Username"
                                   label="Username"
                                   type="text"
                                   name="Username"
                                   component={CustomField}
                              />
                              <Field
                                   key="Password"
                                   label="Password"
                                   type="text"
                                   name="Password"
                                   component={CustomField}
                              />
                             <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option></option>
            <option value="#ff0000">Red</option>
            <option value="#00ff00">Green</option>
            <option value="#0000ff">Blue</option>
          </Field>
        </div>
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
                                   this.props.onTheClose(true,false);
                              }}
                         >
                              Back
                              <i className="material-icons right">cancel</i>
                         </button>
                         <button
                              className="green right btn-flat white-text"
                              onClick={() => {
                                   this.props.createUser(this.props.form);
                                   this.props.onTheClose(false,true);
                              }}
                         >
                              Créer l'utilisateur
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
     destroyOnUnmount: false,
     form: 'newAgentForm',
})(NewAgentForm);
