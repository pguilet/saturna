//Rendering layer control (React router content)
import '../../css/index.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';

import InterfaceHeader from './InterfaceHeader';
import CustomField from '../customs/CustomField';
import Button from 'react-bootstrap/Button';

class Login extends Component {
     state = {};

     constructor(props) {
          super(props);
          this.handleUsernameChange = this.handleUsernameChange.bind(this);
          this.handlePasswordChange = this.handlePasswordChange.bind(this);
     }

     handleUsernameChange(e) {
          this.setState({ username: e.target.value });
     }
     handlePasswordChange(e) {
          this.setState({ password: e.target.value });
     }

     handleSubmit = (event) => {
          event.preventDefault();
          this.props.login(
               this.props.history,
               event.target.username.value,
               event.target.password.value
          );
     };
     renderContent() {
          if (this.props.auth === null || !this.props.auth.username) {
               return (
                    <BrowserRouter>
                         <InterfaceHeader />
                         <main className="container">
                              <form onSubmit={this.handleSubmit}>
                                   <Field
                                        key="username"
                                        label="Username"
                                        type="text"
                                        name="username"
                                        component={CustomField}
                                        onChange={this.handleUsernameChange}
                                   />
                                   <Field
                                        key="password"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        component={CustomField}
                                        onChange={this.handlePasswordChange}
                                   />

                                   <div
                                        className="red-text"
                                        style={{ marginBottom: '20px' }}
                                   >
                                        {this.props.flash
                                             ? this.props.flash.message
                                             : ''}
                                   </div>
                                   <Button
                                        variant="success"
                                        type="button"
                                        className="centered"
                                        type="submit"
                                   >
                                        Log-in
                                        <i className="material-icons separateIcon">
                                             done
                                        </i>
                                   </Button>
                              </form>
                         </main>
                    </BrowserRouter>
               );
          } else {
               return <Redirect to="/agentsHome" />;
          }
     }
     render() {
          return this.renderContent();
     }
}

function mapStateToProps(props) {
     return props;
}
Login = connect(mapStateToProps, actions)(Login);
export default reduxForm({
     destroyOnUnmount: false,
     form: 'loginForm',
})(withRouter(Login));
