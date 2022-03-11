import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { Navigate } from 'react-router-dom';
import InterfaceHeader from './InterfaceHeader';
import CustomField from '../customs/CustomField';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../../utils/routing';

class Login extends React.Component {
     componentDidMount() {
          this.setState({ username: null, password: null });
     }
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
          const { username, password } = event.target;
          event.preventDefault();

          this.props.login(this.props.history, username.value, password.value);
     };
     renderContent() {
          if (this.props.auth === null || !this.props.auth.username) {
               return (
                    <>
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
                                        className="centered"
                                        type="submit"
                                        id="loginButton"
                                   >
                                        Log-in
                                        <i className="material-icons separateIcon">
                                             done
                                        </i>
                                   </Button>
                              </form>
                         </main>
                    </>
               );
          } else {
               return <Navigate to="/agentInterface/agentsHome" />;
          }
     }
     render() {
          return this.renderContent();
     }
}

const mapStateToProps = (state) => ({
     auth: state.auth,
     flash: state.flash,
     history: state.history,
});
const actions = { login };

const form = reduxForm({
     destroyOnUnmount: false,
     form: 'loginForm',
})(Login);
export default connect(mapStateToProps, actions)(withRouter(form));
