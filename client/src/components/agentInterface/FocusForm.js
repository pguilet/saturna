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
import { getField } from '../../utils/forms';

class FocusForm extends Component {
     state = {
          createUserButtonTriggered: false,
          stateTriggeredValues: { files: new Set() },
          fieldsToDisplay: undefined,
     };
     constructor(props) {
          super(props);
          this.bindedGetFieldFunction = getField.bind(this);
     }
     componentDidMount() {
          if (
               this.props.focusFormConfiguration.fieldsToDisplay instanceof
               Function
          ) {
               this.props.focusFormConfiguration
                    .fieldsToDisplay(
                         this.props.focusFormConfiguration.identifiants
                              .modelInstanceId
                    )
                    .then((fieldsToDisplay) =>
                         this.setState({
                              fieldsToDisplay: fieldsToDisplay,
                         })
                    );
          } else {
               this.setState({
                    fieldsToDisplay:
                         this.props.focusFormConfiguration.fieldsToDisplay,
               });
          }
     }
     renderFields() {
          let keyObject = { keyValue: 0 };
          return _.map(this.state.fieldsToDisplay, (field) => {
               const identifiants = this.props.identifiants
                    ? this.props.identifiants.modelParentId
                    : null;
               keyObject.keyValue = keyObject.keyValue + 4;
               return this.bindedGetFieldFunction(
                    field,
                    identifiants,
                    keyObject
               );
          });
     }

     handleSubmit = (event) => {
          event.preventDefault();
          this.setState({
               createUserButtonTriggered: true,
          });
          this.props.focusFormConfiguration.validateButtonAction(
               this.props.history,
               this.props.form,
               this.props.focusFormConfiguration.identifiants,
               this.state.stateTriggeredValues
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
                                   {this.props.focusFormConfiguration &&
                                        this.props.focusFormConfiguration
                                             .fieldsToDisplay &&
                                        this.renderFields()}

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
                              {!this.state.createUserButtonTriggered &&
                                   !(
                                        this.props.focusFormConfiguration
                                             .fieldsToDisplay instanceof
                                        Function
                                   ) && (
                                        <Button
                                             variant="success"
                                             type="submit"
                                             className="centered"
                                        >
                                             {
                                                  this.props
                                                       .focusFormConfiguration
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
