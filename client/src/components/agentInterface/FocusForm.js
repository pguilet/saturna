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
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

class FocusForm extends Component {
     state = {
          createUserButtonTriggered: false,
     };

     renderFields() {
          return _.map(
               this.props.focusFormConfiguration.fieldsToDisplay,
               (field) => {
                    return (
                         <Field
                              key={field.id}
                              label={field.label}
                              type={field.type}
                              name={field.id}
                              component={field.component}
                              disabled={field.disabled ? field.disabled : false}
                              valuetoset={
                                   field.valueToSet
                                        ? field.valueToSet
                                        : undefined
                              }
                              valuestoset={
                                   field.valuesToSet
                                        ? field.valuesToSet
                                        : undefined
                              }
                              className={
                                   field.type === 'select'
                                        ? 'browser-default'
                                        : ''
                              }
                              id={field.id}
                              identifiant={this.props.identifiant}
                              statetriggeredvaluesupdatefunction={(values) =>
                                   (this.stateTriggeredValues = values)
                              }
                         />
                    );
               }
          );
     }

     handleSubmit = (event) => {
          event.preventDefault();
          this.setState({
               createUserButtonTriggered: true,
          });
          this.props.focusFormConfiguration.validateButtonAction(
               this.props.history,
               this.props.form,
               this.props.focusFormConfiguration.identifiant,
               this.stateTriggeredValues
          );
     };

     render() {
          return (
               <Dialog open={true} aria-labelledby="form-dialog-title">
                    <Form onSubmit={this.handleSubmit}>
                         <DialogTitle id="form-dialog-title">
                              {this.props.focusFormConfiguration &&
                                   this.props.focusFormConfiguration.title}
                         </DialogTitle>
                         <DialogContent>
                              <DialogContentText>
                                   {this.props.focusFormConfiguration &&
                                        this.props.focusFormConfiguration
                                             .description}
                              </DialogContentText>

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
                         </DialogContent>

                         <DialogActions>
                              {!this.state.createUserButtonTriggered && (
                                   <Button
                                        variant="warning"
                                        type="button"
                                        className="centered"
                                        onClick={() => {
                                             if (
                                                  this.props
                                                       .focusFormConfiguration
                                                       .backButtonCallback
                                             ) {
                                                  this.props.focusFormConfiguration.backButtonCallback();
                                             }
                                             this.props.configureFocusForm(
                                                  null
                                             );
                                        }}
                                   >
                                        Back
                                        <i className="material-icons separateIcon">
                                             cancel
                                        </i>
                                   </Button>
                              )}
                              {this.state.createUserButtonTriggered && (
                                   <Button variant="primary" disabled>
                                        <Spinner
                                             as="span"
                                             animation="border"
                                             size="sm"
                                             role="status"
                                             aria-hidden="true"
                                        />
                                        <span className="visually-hidden">
                                             Loading...
                                        </span>
                                   </Button>
                              )}
                              {!this.state.createUserButtonTriggered && (
                                   <Button
                                        variant="success"
                                        type="submit"
                                        className="centered"
                                   >
                                        {
                                             this.props.focusFormConfiguration
                                                  .validateButtonLabel
                                        }
                                        <i className="material-icons separateIcon">
                                             done
                                        </i>
                                   </Button>
                              )}
                         </DialogActions>
                    </Form>
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
})(withRouter(FocusForm));
