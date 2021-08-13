//Rendering layer control (React router content)
import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';

import ClientCases from './ClientCases';
import CustomField from '../customs/CustomField';
import Button from 'react-bootstrap/Button';

class ClientClosedCases extends Component {
     render() {
          return <ClientCases openCases={false} />;
     }
}

function mapStateToProps(props) {
     return props;
}
ClientClosedCases = connect(mapStateToProps, actions)(ClientClosedCases);
export default reduxForm({
     destroyOnUnmount: false,
     form: 'loginForm',
})(withRouter(ClientClosedCases));
