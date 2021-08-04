import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class FocusForm extends Component {
     renderFirstOption(valueToSet, values) {
          return _.map(values, (value) => {
               if (value === valueToSet) {
                    return (
                         <option key={value} value={value}>
                              {value}
                         </option>
                    );
               }
          });
     }
     renderOtherOptions(valueToSet, values) {
          return _.map(values, (value) => {
               if (value !== valueToSet) {
                    return (
                         <option key={value} value={value}>
                              {value}
                         </option>
                    );
               }
          });
     }
     renderFields() {
          return _.map(this.props.fieldsToDisplay, (field) => {
               return (
                    <div><label >{field.label}</label>
                    <Field
                         key={field.id}
                         label={field.label}
                         type={field.type}
                         name={field.id}
                         component={field.component}
                         disabled={field.disabled ? field.disabled : false}
                         valuetoset={
                              field.valueToSet ? field.valueToSet : undefined
                         }
                         className={
                              field.type === 'select' ? 'browser-default' : ''
                         }
                    >
                         {this.renderFirstOption(
                              field.valueToSet,
                              field.values
                         )}
                         {this.renderOtherOptions(
                              field.valueToSet,
                              field.values
                         )}
                    </Field>
                    </div>
               );
          });
     }
     render() {
          return (
               <Dialog
                    open={this.props.doOpen}
                    aria-labelledby="form-dialog-title"
               >
                    <DialogTitle id="form-dialog-title">
                         {this.props.title}
                    </DialogTitle>
                    <DialogContent>
                         <DialogContentText>
                              {this.props.description}
                         </DialogContentText>
                         <form>
                              {this.renderFields()}

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
                                   this.props.validateButtonAction(
                                        this.props.form,
                                        this.props.identifiant
                                   );
                                   this.props.onTheClose(false, true);
                              }}
                         >
                              {this.props.validateButtonLabel}
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
FocusForm = connect(mapStateToProps, actions)(FocusForm);
export default reduxForm({
     destroyOnUnmount: true,
     form: 'focusForm',
})(FocusForm);
