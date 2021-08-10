// SurveyForm shows a form for the user to add inputs.
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from '../../customs/CustomField';
import validateEmails from '../../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
     renderFields() {
          return _.map(formFields, ({ label, name }) => {
               return (
                    <Field
                         key={name}
                         label={label}
                         type="text"
                         name={name}
                         component={SurveyField}
                    />
               );
          });
     }
     render() {
          return (
               <div>
                    <form
                         onSubmit={this.props.handleSubmit(
                              this.props.onSurveySubmit
                         )}
                    >
                         {this.renderFields()}
                         <Link
                              to="/surveys"
                              className="red btn-flat left white-text"
                         >
                              Cancel
                              <i className="material-icons right">cancel</i>
                         </Link>
                         <button
                              className="teal btn-flat right white-text"
                              type="submit"
                         >
                              Next
                              <i className="material-icons right">done</i>
                         </button>
                    </form>
               </div>
          );
     }
}

function validate(values) {
     const errors = {};

     _.each(formFields, ({ name }) => {
          if (!values[name]) {
               errors[name] = 'You must provide a value';
          }
     });

     errors.recipients = validateEmails(values.recipients || '');

     return errors;
}

export default reduxForm({
     validate,
     destroyOnUnmount: false,
     form: 'surveyForm',
})(SurveyForm);
