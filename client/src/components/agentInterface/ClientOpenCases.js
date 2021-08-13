//Rendering layer control (React router content)
import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import ClientCases from './ClientCases';
import InterfaceHeader from './InterfaceHeader';
import CustomField from '../customs/CustomField';
import Button from 'react-bootstrap/Button';

class ClientOpenCases extends Component {
     render() {
          return <ClientCases openCases={true} />;
     }
}

function mapStateToProps(props) {
     return props;
}
ClientOpenCases = connect(mapStateToProps, actions)(ClientOpenCases);
export default reduxForm({
     destroyOnUnmount: false,
     form: 'loginForm',
})(withRouter(ClientOpenCases));
