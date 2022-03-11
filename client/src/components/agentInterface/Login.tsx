import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { Navigate } from 'react-router-dom';
import InterfaceHeader from './InterfaceHeader';
import CustomField from '../customs/CustomField';
import Button from 'react-bootstrap/Button';
import { withRouter } from '../../utils/routing';
interface RootProps {
     auth: { username: string } | null; //auth is either null when not initialized, false when initialized but user is not identified and is true when identified.
     flash: { message: string | null | false } | null;
     history: any;
}

interface RootState {
     username: String | null;
     password: String | null;
}

interface Actions {
     login: any;
}

interface Props extends Actions, RootProps, RootState {}

class Login extends React.Component<Props> {
     constructor(props: any) {
          super(props);

          this.handleUsernameChange = this.handleUsernameChange.bind(this);
          this.handlePasswordChange = this.handlePasswordChange.bind(this);
     }

     handleUsernameChange(e: any) {
          this.setState({ username: e.target.value });
     }
     handlePasswordChange(e: any) {
          this.setState({ password: e.target.value });
     }

     handleSubmit = (event: any): void => {
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

const mapStateToProps = (state: RootProps) => ({
     auth: state.auth,
     flash: state.flash,
     history: state.history,
});
const actions = { login };

const form = reduxForm<{}, any>({
     destroyOnUnmount: false,
     form: 'loginForm',
})(Login);
export default connect(mapStateToProps, actions)(withRouter(form));
