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
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
                         <Form>
                         <Form.Group className="mb-3">
                              {this.renderFields()}

                              <div
                                   className="text-danger"
                                   style={{ marginBottom: '20px' }}
                              >
                                   {this.props.flash
                                        ? this.props.flash.message
                                        : ''}
                              </div>
                              </Form.Group>
                         </Form>
                    </DialogContent>
                    <DialogActions>
                    <Button variant="warning" type="button"
                              className="centered"
                              onClick={() => {
                                   this.props.onTheClose(true, false);
                              }}
                         >
                              Back
                              <i className="material-icons separateIcon">cancel</i>
                         </Button>
                         <Button variant="success" type="button"
                              className="centered"
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
                              <i className="material-icons separateIcon">done</i>
                         </Button>
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
