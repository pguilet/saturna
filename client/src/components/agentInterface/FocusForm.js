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
     state={
          stateTriggeredValues:undefined
     }

     renderFields() {
          return _.map(this.props.fieldsToDisplay, (field) => {
               return ( 
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
                         valuestoset={ field.valuesToSet ? field.valuesToSet : undefined}
                         className={
                              field.type === 'select' ? 'browser-default' : ''
                         }
                         identifiant= {this.props.identifiant}
                         statetriggeredvaluesupdatefunction={(values)=>this.setState({stateTriggeredValues:values})}
                   />
                        

               );
          });
     }
     render() {
          return (
               <Dialog
                    open={true}
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
                                        this.props.identifiant,
                                        this.state.stateTriggeredValues
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
